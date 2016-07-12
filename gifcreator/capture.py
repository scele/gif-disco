#!/usr/bin/env python

import glob
import os
import platform
import time

import fabric.context_managers as ctx
from fabric.api import local
from multiprocessing import Pool
from argparse import ArgumentParser

script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

settings = {
    # Where the gif should be moved when created
    'output_dir': '../accepterserver/static/img',

    # Final gif's size. <width>x<height>
    'output_size': '320x240',

    # Rotate parameter given to convert command
    # Camera is sideways because green blanket's aspect ratio is like this:
    #  -----
    # |     |
    # |     |
    # |     |
    #  -----
    'rotate': '270',

    # Crop parameter given to Imagemagick's convert command
    # Image edges should be cropped if the camera view goes outside green
    # blanket. Example: '319x239+0+0'  format WxH+X+Y
    # Cropping is done after rotating, beware that image dimensions change in
    # rotation
    # http://www.imagemagick.org/Usage/crop/#crop
    'crop': None, #'200x320+10+0',

    # On OS X, use "wacaw -L" to list available camera inputs. 0 is usually
    # iSight, and 1 is USB web cam. It might change though.
    # On Windows, use "ffmpeg -list_devices true -f dshow -i dummy" to list
    # available camera inputs, and type the name of the desired video device
    # (e.g. 'Logitech HD Pro Webcam C920') here.
    'camera_input': 'Logitech HD Pro Webcam C920'
}
args = {}

def main():
    parser = ArgumentParser(description='capture camera stream and convert to gif')
    parser.add_argument('--stream', action='store_true',
                        help='stream processed video instead of converting to gif')
    parser.add_argument('--green', action='store_true',
                        help='use green screen')
    parser.add_argument('--white', action='store_true',
                        help='use white screen')
    global args
    args = parser.parse_args()

    clean()
    t0 = time.clock()
    capture_video()
    print "Capturing took " + str(time.clock() - t0)
    #t0 = time.clock()
    #split_video_to_frames()
    #print "Splitting video took " + str(time.clock() - t0)
    #t0 = time.clock()
    #remove_green_from_frames()
    #print "Processing frames took " + str(time.clock() - t0)
    t0 = time.clock()
    create_gif()
    print "Creating gif took " + str(time.clock() - t0)


def clean():
    with ctx.settings(warn_only=True):
        local('rm frames/*.png')


def capture_video():
    w, h = settings['output_size'].split('x')
    cmd = ''
    if platform.system() == 'Windows':
        #transform = 'scale=320:240,transpose=2,crop=200:280:20:40'
        cmd = 'ffmpeg -f dshow -i video="{camera_input}"'
    elif platform.system() == 'Linux':
        cmd = 'ffmpeg -f v4l2 -i /dev/video0'
    elif platform.system() == 'Darwin':
        cmd = 'ffmpeg -f avfoundation -i "default"'

    #cmd += ' -filter_complex "scale=320:240,transpose=2,crop=200:280:20:40'
    #cmd += ',colorkey=0x5A8C5A:0.9:0.2'
    #cmd += '"'
    x = 160
    y = 40
    w = 340
    h = 400

    transform = ''#',transpose=2'
    if args.white:
        colorkey ='colorkey=0xFFFFFF:0.4:0.05'
    else:
        colorkey ='chromakey=0x00BD84:0.2:0.10'
    grid = 'drawgrid=width=100:height=100:thickness=1:color=gray'
    box = "drawbox=x={}:y={}:w={}:h={}:color=blue@0.5".format(x, y, w, h)
    crop = "crop=x={}:y={}:w={}:h={}".format(x, y, w, h)
    skip = ',select=gte(n\,2)'


    #cmd = 'ffmpeg -y -f dshow -t 4 -i video="{camera_input}" -s {width}x{height} -vf "crop=200:280:20:0,transpose=2" preview.avi'
    if args.stream:
        # Stream
        cmd += ' -f lavfi -i color=c=red:size=640x480'
        cmd += ' -filter_complex "[0:v]{colorkey}[ckout];[1:v][ckout]overlay{transform},{grid},{box}[out]" -map "[out]"' \
                        .format(transform=transform, colorkey=colorkey, grid=grid, box=box)
        url = 'udp://127.0.0.1:1234'
        cmd += ' -vcodec libx264 -tune zerolatency -b 900k -bufsize 3000k -f mpegts ' + url
    else:
        # Save to file
        cmd += ' -filter_complex "{colorkey}{transform},{crop}{skip}"' \
                        .format(transform=transform, colorkey=colorkey, crop=crop, skip=skip)
        #cmd += ' -y -t 4 preview.avi'
        cmd += ' -y -t 4 -r 7 "frames/preview%4d.png"'
    local(cmd.format(width=w, height=h, **settings))


def split_video_to_frames():
    cmd = r'ffmpeg -i "preview.avi" -an -ss 00:00:01.50 -r 7 -f image2 -s {output_size} "frames/preview%4d.png"'
    local(cmd.format(**settings))


def remove_green_from_frames():
    p = Pool(8)
    p.map(remove_green_from_frame, glob.glob('frames/*.png'))

def remove_green_from_frame(filename):
    t0 = time.clock()
    local('python remove_green.py "%s"' % filename)
    print "Removing green took " + str(time.clock() - t0)

    cmd = 'convert -rotate {rotate} -gravity South '

    if settings['crop'] is not None:
        cmd += '-crop {crop} '

    cmd += '%s %s' % (filename, filename)
    t0 = time.clock()
    #local(cmd.format(**settings))
    print "Crop+rotate took " + str(time.clock() - t0)

def create_gif():
    cmd = 'convert ' \
          '+repage ' \
          '-delay 12 ' \
          '-loop 0 ' \
          '-dispose Background ' \
          'frames/*.png ' \
          '-trim ' \
          '-layers TrimBounds ' \
          '-duplicate 1,-2-0 ' \
          '-quiet ' \
          '"{output_dir}/preview.gif"'
    local(cmd.format(**settings))


if __name__ == '__main__':
    main()
