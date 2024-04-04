const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({ region: "eu-north-1" });

const env = require('./env');

// ...
// Helper function for the "Service Autoscaling" section.
const delay = delayMs => {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs)
  });
};

let noProcessedMessages = 0;
const instanceId = crypto.randomUUID();

let running = true;
let messageCountForDLQ = 0;

// ...
// TODO 1: Implement SIGINT and SIGTERM handling to stop the processor.
const stopRunning = () => {
  console.log('Exiting polling loop');

  running = false;
}

process.on('SIGINT', stopRunning);
process.on('SIGTERM', stopRunning);

const processor = async () => {

  while (running) {

    // TODO 2: Send ReceiveMessageCommand to receive messages.
    //
    const out = await client.send(new ReceiveMessageCommand({
      QueueUrl: env.queueUrl,
      WaitTimeSeconds: 15
    }));    
    // Note: This may take up to 20 (WaitTime)Seconds - what happens if a SIGINT/SIGTERM is received in the meantime?

    if (!running) {
      console.log('Processor shutting down...');
      break;
    }

    if (out.Messages === undefined || out.Messages.length === 0) {
      // note: continue instead of return! 
      continue;
    }

    // TODO 3: Process messages (if any).
    //
    // Note: For each message (= content request), add the following code to simulate "processing":
    // (see more about the structure of an SQS message: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/modules/message.html)
    // 
    for (const message of out.Messages) {
      const {
         Body,
         ReceiptHandle
      } = message;
    
      const body      = JSON.parse(Body);
      const requestId = body.Message;

  
      // Process message by updating the request status.
      await delay(1 * 1000);
      console.log(`Instance ${instanceId} processing request with ID: ${requestId}, (${++noProcessedMessages})`);

            
      messageCountForDLQ++;
      if (messageCountForDLQ % 5 === 0) {
        // Simulate failure for every fifth message
        console.log(`Simulating failure for message ID: ${requestId}`);
        // Skip the deletion of the message. This will make SQS retry it.
      } else {
        console.log(`Processor updated by pipeline`);
        console.log('Processing request with ID: ' + requestId);
        // Delete the message from the queue to mark it as successfully processed
        await client.send(new DeleteMessageCommand({
          QueueUrl: env.queueUrl,
          ReceiptHandle
        }));
      }

    }
     // 

    // 


    // TODO 4: For each message, send DeleteMessageCommand to instruct the queue the the message has been handled and can be removed.
  }
}

processor();