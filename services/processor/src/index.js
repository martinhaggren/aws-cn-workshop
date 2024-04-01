// ...
// Helper function for the "Service Autoscaling" section.
const delay = delayMs => {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs)
  });
};

// ...

let running = true;

// ...
// TODO 1: Implement SIGINT and SIGTERM handling to stop the processor.

const processor = () => {
  while (running) {
    // TODO 2: Send ReceiveMessageCommand to receive messages.
    //
    // Note: This may take up to 20 (WaitTime)Seconds - what happens if a SIGINT/SIGTERM is received in the meantime?

    // TODO 3: Process messages (if any).
    //
    // Note: For each message (= content request), add the following code to simulate "processing":
    // (see more about the structure of an SQS message: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/modules/message.html)
    // 
    // const {
    //     Body,
    //     ReceiptHandle
    // } = message;
    // 
    // const body      = JSON.parse(Body);
    // const requestId = body.Message;
    // 
    // console.log('Processing request with ID: ' + requestId);
    // 
    // (Optionally invoke the TMS Content service to update the status)

    // TODO 4: For each message, send DeleteMessageCommand to instruct the queue the the message has been handled and can be removed.
  }
}

processor();