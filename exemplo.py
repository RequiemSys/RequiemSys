from requests import request


re = request(method="get", url="https://google.com")
print(re)