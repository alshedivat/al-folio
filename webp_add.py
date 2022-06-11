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
    
for image in tqdm(files_grabbed):
    for width in widths:
        resize(image, width)
