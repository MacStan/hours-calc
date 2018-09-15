import os
import zipfile

z = zipfile.ZipFile("hoursCounter.zip", "w")


z.write("D:\projects\JavaScript\gc-hc-ext\html\index.html","html\index.html")

z.write(r"D:\projects\JavaScript\gc-hc-ext\out\background.js",r"out\background.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\out\common.js","out\common.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\out\differenceCount.js","out\differenceCount.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\out\index.js","out\index.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\out\lengthCount.js","out\lengthCount.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\out\options.js","out\options.js")

z.write(r"D:\projects\JavaScript\gc-hc-ext\moment\moment.min.js",r"moment\moment.min.js")

z.write(r"D:\projects\JavaScript\gc-hc-ext\manifest.json",r"manifest.json")

z.write(r"D:\projects\JavaScript\gc-hc-ext\icons\baseline-schedule-black-18\1x\baseline_schedule_black_18dp.png",r"icons\baseline-schedule-black-18\1x\baseline_schedule_black_18dp.png")
z.write(r"D:\projects\JavaScript\gc-hc-ext\icons\baseline-schedule-black-24\1x\baseline_schedule_black_24dp.png",r"icons\baseline-schedule-black-24\1x\baseline_schedule_black_24dp.png")
z.write(r"D:\projects\JavaScript\gc-hc-ext\icons\baseline-schedule-black-24\2x\baseline_schedule_black_24dp.png",r"icons\baseline-schedule-black-24\2x\baseline_schedule_black_24dp.png")
z.write(r"D:\projects\JavaScript\gc-hc-ext\icons\baseline-schedule-black-48\2x\baseline_schedule_black_48dp.png",r"icons\baseline-schedule-black-48\2x\baseline_schedule_black_48dp.png")

z.write(r"D:\projects\JavaScript\gc-hc-ext\bootstrap\bootstrap.min.js",r"bootstrap\bootstrap.min.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\bootstrap\bootstrap.min.css",r"bootstrap\bootstrap.min.css")

z.write(r"D:\projects\JavaScript\gc-hc-ext\react-0.14.3\build\react.js", r"react-0.14.3\build\react.js")
z.write(r"D:\projects\JavaScript\gc-hc-ext\react-0.14.3\build\react-dom.js", r"react-0.14.3\build\react-dom.js")

z.close()



