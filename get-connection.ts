import Redis from "ioredis"


// function connectRedis(){
//     client.on("error", function(error){
//     console.error("Error encountered", error)
// })

// client.on("connect", function(){
//     console.log("Redis connection established ")
// })

// client.set("channelName", "CodeSpace", (error, result) => {
//   if (error) {
//     console.error("Error encountered", error);
//   } else {
//     console.log("Value set successfully:", result);
//   }
// });
// client.get("channelName", (error, result) => {
//   if (error) {
//     console.error("Error encountered", error);
//   } else {
//     console.log("Value retrieved:", result);
//   }
// });
// }
// export default connectRedis


const redisClient = new Redis({
  host: "localhost",
  port: 6379,
  // Add any other configuration options you need
});

export default redisClient;
