import yaml, glob, os
from tqdm import tqdm


with open(r'_config.yml') as file:
    # The FullLoader parameter handles the conversion from YAML
    # scalar values to Python the dictionary format
    data = yaml.load(file, Loader=yaml.FullLoader)
    
    _path = data['imagemagick']['input_directories'][0]
    widths = data['imagemagick']['widths']
    types = data['imagemagick']['input_formats']
    types = tuple([_path + '**/*' + _type for _type in types])

    
for item in tqdm(glob.glob(_path+'**/*.webp', recursive=True)):
    os.remove(item)