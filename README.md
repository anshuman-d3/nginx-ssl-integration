
# SSL integration with Node and React apps behind Nginx reverse proxy

Example on integrating self-signed certificate with Nginx, redirecting all http requests to https, based on uri; redirect the requests to different ports.




## Generating self-signed ssl certificate

Install openssl on windows from [here](https://slproweb.com/products/Win32OpenSSL.html) and open a command promt and execute the following command.

```bash
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl.key -out ssl.crt -subj "/CN=localhost"

```

## Running UI and Backend

Navigate to both "api" and "my-app" directory and run the following command separately.
```bash
npm install
```
Star the applications with the following command.
```bash
npm run start
```

## Installing and configuring Nginx on windows

Download Nginx from [here](http://nginx.org/en/download.html). Extract the zip to a folder and edit the conf\nginx.conf with path to ssl certificate and key, port number of backend and ui applications.

```bash
    server {
        	listen       80;
        	server_name  localhost;
		
        	return       301 https://$server_name$request_uri;      // redirect all non-https requests to https
    	}

	server {
		listen	443 ssl;
		server_name  localhost;

		ssl_certificate      <path to ssl certificate>/ssl.crt;
        ssl_certificate_key  <path to ssl certificate>/ssl.key;

        // redirect all requests to UI running on port 3000
        location / {
            proxy_pass http://localhost:3000;
        }

        // redirect all requests to backend running on port 3080, when the path starts with "/api"
	  	location /api {
            proxy_pass http://localhost:3080;
        }

	}
```
After configuration execute the nginx.exe.


Navigate to "https://localhost/" on a browser. All the connections to the backend and UI will be over https.

> Browsers may show error messages (i.e. connection is not trusted) because of the self-signed certificate and unverfied issuer.
## Authors

- Sample [app](https://github.com/bbachi/react-nodejs-example) used in this repo [@bbachi](https://github.com/bbachi)
- Anshuman Panda [@anshuman-d3](https://github.com/anshuman-d3)