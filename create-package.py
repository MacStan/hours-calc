import os
import zipfile

z = zipfile.ZipFile("hoursCounter.zip", "w")


z.write(".\html\index.html","html\index.html")

z.write(r".\src\out\background.js",         r"src\out\background.js")
z.write(r".\src\out\common.js",             r"src\out\common.js")
z.write(r".\src\out\differenceCount.js",    r"src\out\differenceCount.js")
z.write(r".\src\out\index.js",              r"src\out\index.js")
z.write(r".\src\out\lengthCount.js",        r"src\out\lengthCount.js")
z.write(r".\src\out\options.js",            r"src\out\options.js")
z.write(r".\src\out\compiled.js",            r"src\out\compiled.js")

z.write(r".\lib\moment\moment.min.js",r"\lib\moment\moment.min.js")

z.write(r".\manifest.json",r"manifest.json")

z.write(r".\icons\baseline-schedule-black-18\1x\baseline_schedule_black_18dp.png",r"icons\baseline-schedule-black-18\1x\baseline_schedule_black_18dp.png")
z.write(r".\icons\baseline-schedule-black-24\1x\baseline_schedule_black_24dp.png",r"icons\baseline-schedule-black-24\1x\baseline_schedule_black_24dp.png")
z.write(r".\icons\baseline-schedule-black-24\2x\baseline_schedule_black_24dp.png",r"icons\baseline-schedule-black-24\2x\baseline_schedule_black_24dp.png")
z.write(r".\icons\baseline-schedule-black-48\2x\baseline_schedule_black_48dp.png",r"icons\baseline-schedule-black-48\2x\baseline_schedule_black_48dp.png")

z.write(r".\lib\bootstrap\bootstrap.min.js",r"lib\bootstrap\bootstrap.min.js")
z.write(r".\lib\bootstrap\bootstrap.min.css",r"lib\bootstrap\bootstrap.min.css")

z.write(r".\lib\react-0.14.3\build\react.js", r"lib\react-0.14.3\build\react.js")
z.write(r".\lib\react-0.14.3\build\react-dom.js", r"lib\react-0.14.3\build\react-dom.js")

z.write(r".\LICENSE", r"LICENSE")

z.close()



