# z-index: 10; min-width: 75px; max-width: 75px; white-space: nowrap; text-align: center; outline: currentcolor none medium; box-shadow: rgb(153, 153, 153) 0px 0px 0px 0px; box-sizing: border-box; cursor: pointer; visibility: inherit; transition: none 0s ease 0s; color: rgb(255, 255, 255); line-height: 71px; margin: 0px; padding: 0px; letter-spacing: 0px; font-weight: 500; font-size: 30px; min-height: 0px; max-height: none; opacity: 1; transform: translate3d(0px, 0px, 0px); transform-origin: 50% 50% 0px; border-width: 2px;
#
# split on ;
# split on :
# remove- (as many) make capital letter
# quote
# quote

import re

with open("index.js", "r") as f:
    content = f.read()

    regext = '/style="([^"]*)"/'
    re.search(regext, )



