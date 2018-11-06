# sshme

The simple utility allows you to perform bash commands on a cluster described in the hosts.json file.
To configure your cluster you have to change the hosts.json file.

Filter hosts before run commands:
```javascript
> .
[ 'cluster-co01.dns.best.com',
  'cluster-co02.dns.best.com',
  'cluster-ui01.dns.best.com',
  'cluster-ui02.dns.best.com' ]

> co
[ 'cluster-co01.dns.best.com',
  'cluster-co02.dns.best.com' ]

> co hostname
> cluster-co01.dns.best.com:
cluster-co01.dns.best.com

> cluster-co02.dns.best.com:
cluster-co02.dns.best.com
```

Dependencies:
- node js
- ssh2 node js module - https://github.com/mscdex/ssh2



**connect**(< _object_ >config) - _(void)_ - Attempts a connection to a server using the information given in `config`:

    * **host** - _string_ - Hostname or IP address of the server. **Default:** `'localhost'`

    * **port** - _integer_ - Port number of the server. **Default:** `22`

    * **forceIPv4** - _boolean_ - Only connect via resolved IPv4 address for `host`. **Default:** `false`

    * **forceIPv6** - _boolean_ - Only connect via resolved IPv6 address for `host`. **Default:** `false`

    * **hostHash** - _string_ - 'md5' or 'sha1'. The host's key is hashed using this method and passed to the **hostVerifier** function. **Default:** (none)

    * **hostVerifier** - _function_ - Function with parameters `(hashedKey[, callback])` where `hashedKey` is a string hex hash of the host's key for verification purposes. Return `true` to continue with the handshake or `false` to reject and disconnect, or call `callback()` with `true` or `false` if you need to perform asynchronous verification. **Default:** (auto-accept if `hostVerifier` is not set)

    * **username** - _string_ - Username for authentication. **Default:** (none)

    * **password** - _string_ - Password for password-based user authentication. **Default:** (none)

    * **agent** - _string_ - Path to ssh-agent's UNIX socket for ssh-agent-based user authentication. **Windows users: set to 'pageant' for authenticating with Pageant or (actual) path to a cygwin "UNIX socket."** **Default:** (none)

    * **agentForward** - _boolean_ - Set to `true` to use OpenSSH agent forwarding (`auth-agent@openssh.com`) for the life of the connection. `agent` must also be set to use this feature. **Default:** `false`

    * **privateKey** - _mixed_ - _Buffer_ or _string_ that contains a private key for either key-based or hostbased user authentication (OpenSSH format). **Default:** (none)

    * **passphrase** - _string_ - For an encrypted private key, this is the passphrase used to decrypt it. **Default:** (none)

    * **localHostname** - _string_ - Along with **localUsername** and **privateKey**, set this to a non-empty string for hostbased user authentication. **Default:** (none)

    * **localUsername** - _string_ - Along with **localHostname** and **privateKey**, set this to a non-empty string for hostbased user authentication. **Default:** (none)

    * **tryKeyboard** - _boolean_ - Try keyboard-interactive user authentication if primary user authentication method fails. If you set this to `true`, you need to handle the `keyboard-interactive` event. **Default:** `false`

    * **keepaliveInterval** - _integer_ - How often (in milliseconds) to send SSH-level keepalive packets to the server (in a similar way as OpenSSH's ServerAliveInterval config option). Set to 0 to disable. **Default:** `0`

    * **keepaliveCountMax** - _integer_ - How many consecutive, unanswered SSH-level keepalive packets that can be sent to the server before disconnection (similar to OpenSSH's ServerAliveCountMax config option). **Default:** `3`

    * **readyTimeout** - _integer_ - How long (in milliseconds) to wait for the SSH handshake to complete. **Default:** `20000`

    * **sock** - _ReadableStream_ - A _ReadableStream_ to use for communicating with the server instead of creating and using a new TCP connection (useful for connection hopping).

    * **strictVendor** - _boolean_ - Performs a strict server vendor check before sending vendor-specific requests, etc. (e.g. check for OpenSSH server when using `openssh_noMoreSessions()`) **Default:** `true`

    * **algorithms** - _object_ - This option allows you to explicitly override the default transport layer algorithms used for the connection. Each value must be an array of valid algorithms for that category. The order of the algorithms in the arrays are important, with the most favorable being first. For a list of valid and default algorithm names, please review the documentation for the version of `ssh2-streams` used by this module. Valid keys:

        * **kex** - _array_ - Key exchange algorithms.

        * **cipher** - _array_ - Ciphers.

        * **serverHostKey** - _array_ - Server host key formats.

        * **hmac** - _array_ - (H)MAC algorithms.

        * **compress** - _array_ - Compression algorithms.

    * **compress** - _mixed_ - Set to `true` to enable compression if server supports it, `'force'` to force compression (disconnecting if server does not support it), or `false` to explicitly opt out of compression all of the time. Note: this setting is overridden when explicitly setting a compression algorithm in the `algorithms` configuration option. **Default:** (only use compression if that is only what the server supports)

    * **debug** - _function_ - Set this to a function that receives a single string argument to get detailed (local) debug information. **Default:** (none)
