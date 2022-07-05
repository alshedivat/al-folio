import multiprocessing
import time
import yaml, glob, os
from tqdm import tqdm
from wand.image import Image

def resize(input_file, width):
    # Read image using Image function
    with Image(filename =input_file) as img:

        # using transform() function
        img.transform(resize = str(width)+'x')

        # Saving image
        parentname = os.path.splitext(input_file)[0]
        img.save(filename='{}-{}.webp'.format(parentname, str(width)))


def filter_files(non_webp_files, webp_files, widths):
    '''
    non_web_files consist of list of files that are not webp files
    webp_files consist of list of files that are webp files
    widths consist of list of widths to be resized
    '''

    # cast widths to str
    widths = [str(width) for width in widths]

    result = []
    for file in non_webp_files:
        parentname = os.path.splitext(file)[0]
        # check if parentname is substring of any webp file
        # if yes, then pass
        # if no, then append to result list
        if any(parentname in webp_file for webp_file in webp_files):
            pass
        else:
            result.append(file)

    return result


if __name__ == '__main__':
    # start timer
    start = time.time()
    print('Started at: ', time.strftime("%H:%M:%S", time.localtime()))

    with open(r'_config.yml') as file:
        # The FullLoader parameter handles the conversion from YAML
        # scalar values to Python the dictionary format
        data = yaml.load(file, Loader=yaml.FullLoader)
        
        _path = data['imagemagick']['input_directories'][0]
        widths = data['imagemagick']['widths']
        types = data['imagemagick']['input_formats']
        types = tuple([_path + '**/*' + _type for _type in types])
        
    files_grabbed = []
    for files in types:
        files_grabbed.extend(glob.glob(files, recursive=True))
    
    webp_files = glob.glob(_path+'**/*.webp', recursive=True)
    filtered_files = filter_files(files_grabbed, webp_files, widths)

    # execute resize function in parallel using starmap
    with multiprocessing.Pool(processes=4) as pool:
        pool.starmap(resize, [(file, width) for file in filtered_files for width in widths])
    
    # end timer
    end = time.time()

    # format time_taken in seconds to minutes and seconds
    time_taken = end - start
    minutes = time_taken // 60
    seconds = time_taken % 60
    print('Time taken: ', minutes, 'minutes', seconds, 'seconds')
