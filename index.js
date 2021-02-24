const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  const res = {
    statusCode: 200,
    headers: {
      "Content-Type": "*/*",
    },
  };

  if (event.pathParameters && event.pathParameters.title) {
    const params = {
      TableName: "Tasks",
      Key: {
        Title: decodeURIComponent(event.pathParameters.title),
      },
    };

    try {
      const { Item } = await documentClient.get(params).promise();
      if (Item) {
        res.body = JSON.stringify(Item);
        return res;
      } else {
        res.statusCode = 404;
        const body = {
          error: "Task not found.",
        };
        res.body = JSON.stringify(body);
        return res;
      }
    } catch (error) {
      res.statusCode = 400;
      const body = {
        error,
      };
      res.body = JSON.stringify(body);
      return res;
    }
  } else {
    res.statusCode = 400;
    const body = {
      error: "No title parameter attached to URL.",
    };
    res.body = JSON.stringify(body);
    return res;
  }
};
