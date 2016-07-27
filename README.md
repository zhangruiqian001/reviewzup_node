# reviewzup
* mkdir data
* mongod -dbpath ./data/
* npm run start

| url | method | header | body |res|
|---|---|---|---|---|
|/api/register|post|content-type:application/json|{"username": "tigger","password": "123"}|...,"token": "JWT XXXXX"|
|/api/authenticate|post|content-type:application/json|{"username": "tigger","password": "123"}|...,"token": "JWT XXXXX"|
|/api/order|post|..Authorization:JWT XXXX|{"url":"XXX","reviewNumber":10,"totalPrice":30}|..., "message": "New order has been add to reviewzup"|
|/api/orders|get|..Authorization:JWT XXXX||[XXX,XXX]|
