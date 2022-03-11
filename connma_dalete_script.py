import csv 
import glob
import os


files = glob.glob('./maze_data/*.txt')
for file in files:
    os.rename(file,file.split('\\')[0]+'/'+''.join(file.split('\\')[1].split(',')))
    #os.rename(file,file.split('\\')[0]+'/'+file.split('\\')[1]+'/'+''.join(file.split('\\')[2].split(',')))

# with open('./name_base64code_taiou2.csv', 'w', newline='') as f2:
#     writer = csv.writer(f2)
#     with open('./name_base64code_taiou.csv') as f:
#         reader = csv.reader(f)
#         for row in reader:
#             writer.writerow([row[0],''.join(row[1].split(','))])
    #print(''.join(f.read().split(',')[3:]))
    
    #print(f.read().split(',')[3:])