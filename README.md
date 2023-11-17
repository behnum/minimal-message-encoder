# minimal-message-encoder [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Overview

A JavaScript implementation of a simple binary message encoding scheme designed for a signaling protocol. This encoding scheme is intended for passing messages between peers in a real-time communication application. The primary components include a Message class representing a message with headers and a payload, and a MessageCodec class providing methods for encoding and decoding messages.

## Implementation Details

### Message Structure

A message in this encoding scheme consists of a variable number of headers and a binary payload. Headers are name-value pairs, where both names and values are ASCII-encoded strings. Each header's name and value are limited to 1023 bytes independently. A message can contain a maximum of 63 headers. The message payload is limited to 256 KiB.

### Message Class

The `Message` class has the following structure:

```javascript
class Message {
  constructor() {
    this.headers = {};
    this.payload = new Uint8Array(0); // Initialize an empty payload
  }
}
```

### MessageCodec Class

The `MessageCodec` class provides methods for encoding and decoding messages:

```javascript
class MessageCodec {
  encode(message) {
    // ... (see code for encoding logic)
    return encodedMessage;
  }

  decode(data) {
    // ... (see code for decoding logic)
    return message;
  }
}
```

### Encoding Logic

The encoding process involves converting headers and payload into a binary representation. The header names and values are prefixed with their lengths, and the payload size is encoded in the message header. The resulting binary message is a concatenation of encoded headers and payload information.

### Decoding Logic

The decoding process involves parsing the binary message to reconstruct the original message object. It extracts header information, payload size, and payload data from the encoded message.

## Usage

### Creating a Message

To create a message, instantiate the `Message` class, set headers, and provide a payload:

```javascript
const originalMessage = new Message();
originalMessage.headers = { "Content-Type": "application/json", "Authorization": "Bearer token" };
originalMessage.payload = new TextEncoder().encode("Hello, world!");
```

### Encoding and Decoding

To encode and decode messages, use the `MessageCodec` class:

```javascript
const codec = new MessageCodec();

// Encoding the message
const encodedData = codec.encode(originalMessage);
console.log("Encoded Data:", encodedData);

// Decoding the message
const decodedMessage = codec.decode(encodedData);
console.log("Decoded Message:", decodedMessage);
```

## Error Handling

The implementation includes error handling for cases where the header count exceeds the limit or the payload size exceeds the maximum allowed.

## Assumptions

No assumptions were made in the design and implementation beyond the specifications provided in the task description.

## Notes to Developers

- **Production-Grade Code:** The implementation aims to be clean, simple, and proportionate to the problem's complexity. It follows best practices for input validation, error handling, and overall code readability.
- **Third-Party Dependencies:** The implementation refrains from using any platform built-in or third-party serializer implementations, as per the task requirements.

## Contributions and Issues

Contributions to the repository are welcome. If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](https://github.com/behnum/minimal-message-encoder/blob/main/LICENSE).
