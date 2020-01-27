---
title: "Https Explained Simply"
date: 2019-08-21
lastmod: 2019-09-08
description: "I found it difficult to find a simple overview of why HTTPS is important, and how it works, so I put this post together."
draft: false
---

At work, we run a lot of different websites. From time to time, we need to renew the HTTPS certs used by some of the unfortunate few not powered by Let's Encrypt yet. Recently, I needed a simple way to describe what was happening through the whole process.

When I turned to google looking for a simple explanation, what I found was either a bit too simple or way too deep. Lots of easy explanations like HTTPS is more secure and therefore you should use it - it's encrypted! Or that it means the server you're communicating with has been verified to definitely be the one you intend to talk to by a third party. These things are true, but how does this all actually happen?

What is HTTPS?
--------------

The acronym stands for 'Hypertext Transfer Protocol Secure' - just adding 'Secure' to your HTTP. This secure part is another layer on requests that encrypts the data going over the wire such that only the server you are talking to and yourself can read the data. That way, should a request be intercepted enroute to it's destination, it will be unreadable by a third party. With regular HTTP each request is sent over the internet as plaintext and when intercepted can be easily read. You and the server will also decide, in the open, what key and encryption to use and, even with all of that information, a third party will not be able to decrypt your requests. Pretty cool.

SSL, TLS, what gives?
---------------------

The encryption for HTTPS is using protocols commonly referred to as SSL, but is actually widely implemented as TLS. _Secure Socket Layer_ - or SSL - is an early protocol that allowed services to communicate over the internet via encrypted messages. SSL can be cracked and officially reached it's end of life in 2015, so it has been largely replaced by _Transport Layer Security_ or TLS. TLS is an evolution of SSL that is a means to the same end but rebranded and rewritten. So you should be using and referring to the encryption employed by HTTPS as TLS and not SSL. SSL these days is sort of a _confusion_ layer more than anything - but I wanted to put some light on what the heck the difference is here. Use TLS, and _turn off_ SSL.

Actually _disabling_ SSL is important because part of the spec for HTTPS allows the client and server to negotiate which protocol they will use to encrypt the information they send between them. So older clients that do not support TLS can request that your server sends them information using SSL instead and if your sever is configured for it, your sever will go ahead and do that. However, since SSL is known to be decrypt-able, it is nearly the same as sending plaintext over the wire. So even for old clients SSL is a bit of a moot point - it is not, in fact, secure.

How does the encryption layer work?
-----------------------------------

Now that you're definitely using TLS, what the heck is TLS anyway? Encryption? Is that like magic?

No, it's math. If you're totally new to encryption, I think Digital Ocean did a nice job in [this post](https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process) about SSH.

Shortly, here's what happens:

1\. Your computer will say Hello to the server you're asking for and in that message include the range of encryption algos you are able to speak in (most likely TLS - but I believe that as long as you and the server both support it, you can use any algo you want here). Server responds with which version it can use that you also support.

2\. The Server offers a cryptographically signed certificate that lets the client know 'Hey, I am representing this domain for this person from x until y dates, here's my public key' (and a bit more info but that's the gist). It's then up to your computer (the client) to verify that the server is really who it says it is. For most websites, that means you're going to go ask a Certificate Authority if they agree and recognize the public key the server offered.

3\. Your computer makes a random key and sends it to the server after encrypting it using the server's public key. The server is able to decrypt this key and you'll both use it to encrypt/decrypt your ensuing conversation symmetrically (with this singular key on both ends).

So now you and the server are talking by generating regular HTTP plaintext and then encrypting it before sending it off to one another. So while the messages are in transit no one will be able to read them. This is the reason you should always be using HTTPS instead of HTTP - not even your ISP can figure out exactly what the two machines are saying to one another when you're communicating through HTTPS connections (they can probably glean some of it with DNS lookups or through other means, but that's a different topic).

...Certificates? Authority?
---------------------------

A key part of HTTPS is that you trust the server is actually controlled by who you expect it to be. Otherwise you could potentially be sending data - still safely over the wire - directly to a compromised server. Certificates are quite easy to generate, so this could be a real problem.

This is generally avoided by having your browser verify the supplied certificate with one of several Certificate Authorities (CAs) such as Comodo, Symantec, GlobalSign, etc.

The verification is done with a digitally signed certification process. So signed certificate is actually an artifact that includes a public key and the encrypted certificate that can be easily decrypted by anyone with this public key. However, this artifact can only be _created_ by using the associated private key which only the CA has.

This is what you're doing when you send a certificate request over to a CA like Comodo - you're supplying them the base certificate that they will later send back to you -'signed' by their private key - once they verify that you own the server you're requesting a cert for.  
In this way, there is demonstrable proof that the CA granted this certificate to this domain and that it is very likely who you expect it to be.

Wrapping up
-----------

You may not have noticed, but there is another great security layer here. Not only is the server's cert signed by the public key of a CA so it cannot be created by anyone else, actually using the key requires that the server actually holds it's own private key. So while anyone can copy your public HTTPS key and then claim to be the server behind google.com, only Google will be able to decrypt the original key that your client generates and _encrypts with the server's public key_. Assuming all of the algos used to generate the encryption remain secure (and they might not, like SSL), it is pretty difficult to spoof an HTTPS cert that has been properly signed by a CA unless you compromise the DNS records or server - at which point the cert is moot anyway.

This has been a light, surface-level overview of HTTPS that is rather specific to it's use on web sites. You should know that the HTTPS protocol can and should be used to transfer data between two computers over the internet, including when you've got two servers exchanging some data. It's not limited to websites, and there are ways to create self-signed keys or use keys without consulting a CA if you have a trusted party to communicate with. Check around for some other great posts going a bit deeper into things should you be interested.

Thanks for reading!