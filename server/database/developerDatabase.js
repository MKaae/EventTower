import { MongoClient } from "mongodb";

const isDeleteMode = process.argv.includes("delete");

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const dbName = "event_tower";

await client.connect();

const db = client.db(dbName);

if (isDeleteMode) {
  async function resetDatabase() {
    try {
      /* Add users to development database */
      const usersCollection = db.collection("users");
      await usersCollection.deleteMany({});

      const dummyUsers = [
        {
          username: "admin",
          email: "admin@admin.com",
          password: "$2b$14$wpJOv5pfnPOiidVLUptieeYpMm99l01mrGpEqPEmNT4v1urYF8I0i",
          role: "admin",
        },
        {
          username: "user",
          email: "user@user.com",
          password: "$2b$14$wpJOv5pfnPOiidVLUptieeYpMm99l01mrGpEqPEmNT4v1urYF8I0i",
          role: "user",
        },
      ];

      await usersCollection.insertMany(dummyUsers);

      /* Add games to development database */
      const gamesCollection = db.collection("games");
      await gamesCollection.deleteMany({});

      const dummyGames = [
        {
          imageURL: "https://cdn.cloudflare.steamstatic.com/steam/apps/2225070/capsule_616x353.jpg",
          name: "Trackmania",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
        {
          imageURL: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg",
          name: "CS2",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
        {
          imageURL: "https://cdn.cloudflare.steamstatic.com/steam/apps/238960/header.jpg",
          name: "Path of Exile",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        },
      ];
      await gamesCollection.insertMany(dummyGames);

      /* Add events to development database */
      const eventsCollection = db.collection("events");
      await eventsCollection.deleteMany({});

      const dummyEvents = [
        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          game: "Trackmania",
          name: "Deep Dip 2",
          description: "Deep Dip 2 is an ongoing event in trackmania to climb a tower.",
          articles: [
            {
              title: "Bren Reaches the Top: Number 1 in Deep Dip 2",
              author: "Steffen",
              body: "In a thrilling turn of events, Bren has emerged as the number 1 player in the Deep Dip 2 competition. Known for his exceptional skills and strategic gameplay, Bren managed to outpace the competition and secure the top spot on the leaderboard. His achievement is a testament to his dedication and expertise in Trackmania. Fans and fellow competitors alike have been celebrating his victory, acknowledging the hard work and precision that went into his performances. Bren's success adds an exciting highlight to the Deep Dip 2 event, inspiring others to aim for greatness.",
            },

            {
              title: "Deep Dip 2: Over One Month of Non-Stop Action",
              author: "Steffen",
              body: "The Deep Dip 2 event in Trackmania is set to run for over a month, providing an extended period of competition and excitement. This marathon event offers players ample time to perfect their strategies and improve their times on the complex tracks. With daily challenges and evolving leaderboards, participants are encouraged to stay engaged and keep pushing their limits. The extended duration also allows for a more dynamic and competitive atmosphere as players from different time zones and skill levels compete for the top positions.",
            },
            {
              title: "Deep Dip 2 Event Launches with a Bang",
              author: "Steffen",
              body: "The highly anticipated Deep Dip 2 event in Trackmania has officially launched, drawing in top players and fans from around the world. The event features a series of challenging tracks designed to test the limits of even the most skilled racers. With new obstacles and twists, Deep Dip 2 promises to deliver an exhilarating experience for all participants. The opening day saw a surge of activity as players rushed to start their runs, aiming for the top spots on the leaderboard.",
            },
          ],
          general: {
            body: `  <h1>BEGINNER'S GUIDE TO TRACKMANIA</h1>
            <p>
              Trackmania may be a licence that is almost 20 years old, but it is still relevant today thanks to its
              simple yet technical gameplay. This is especially true since the release of Trackmania 2020, which offers
              both an accomplished game environment for professionals and a welcoming entry point for new players. But
              if you're a beginner who decides to finally get into Trackmania, there's some tips to know in order to get
              off to a good start and improve your times quickly.
            </p>
          
            <h2>Choosing your controls</h2>
            <p>
              Before launching yourself into Trackmania, you'll have to make a difficult choice! Should I use the
              joystick or the keyboard? For an arcade racing game, one might think that the controller is the obvious
              choice. However, many players, including professionals, have been getting comparable performance with the
              keyboard on Trackmania for many years. The joystick has the advantage of offering a better feel and
              control on the ice, while the keyboard allows for a more binary and raw control of your vehicle. In short,
              it's up to you to choose which peripheral you feel most comfortable with.
            </p>
            <h2>Play</h2>
            <p>
              We could give you a billion tips on Trackmania, but the most important of all will remain this one: play
              the game. You should first get behind the wheel yourself and start to get used to the handling, speed and
              overall physics of Trackmania, before getting into the more subtle techniques. Start playing
              unpretentiously and go through the practice tracks, without necessarily trying to set the fastest times.
              You can then familiarise yourself with the different environments and obstacles that Trackmania has to
              offer, from chicanes to loops to domed stepping stones.
            </p>
            <h2>Do not maintain acceleration</h2>
            <p>
              Now that you've got the hang of it, it's time for the practical tips! If you were used to fun, arcade
              racing games where you hold the throttle the whole time, you were probably baffled (literally!) by the
              number of walls you were hitting. As a game based on the Time AttackSpeed management is the main component
              of Trackmania. It starts with taming your throttle and learning when to leave it alone. It is best to go
              slowly and make sure you are going to pass an obstacle than driving off the road or flipping your car.
              There are no hard and fast rules for managing acceleration, however. Each obstacle is different and the
              speed at which you clear one will determine the speed at which you can clear the next. <br />To help you
              stay on track, keep an eye on the back of your vehicle. The number on the display is your speed. Try to
              memorise the speed you are going when you pass an obstacle complicated. Depending on whether or not you
              manage to clear the obstacle, you will know whether you can afford to speed up a little or whether you
              should slow down. Mastering a Trackmania track is sometimes a matter of remembering the ideal speeds for
              each pitfall.
            </p>
            <h2>Learn to drift</h2>
            <p>
              To maintain your speed, even in complex corners, you will have to learn to drift. By taking your foot off
              the accelerator for a fraction of a second, or even braking a little before or during a turn, you will be
              able to negotiate complex trajectories and negotiating curves at full speed. This is the first technique
              that you must master to improve your lap times, as it is used at almost every turn in the game. Please
              note that drifting is only referred to on the road. When you drift on other types of terrain, you are
              talking about a slide. Drifting has a very particular behaviour that we detail in our dedicated guide.
            </p>
            <h2>Learning air control</h2>
            <p>
              You were driving along, when suddenly a springboard throws you 15 metres above the ground. Don't panic,
              don't let go of the controller though, as you can still control your vehicle in the air (hence the name
              Air Control). Once in the void, your only aim should be to position your vehicle so that it is parallel to
              the ground on reception. You can rotate your vehicle, such as a barrel roll, but you cannot freely change
              the inclination of the vehicle. As long as you accelerate, your vehicle will maintain its speed, but will
              dive forward. In order to lock the inclination of your vehicle, you can brake (by pressing back). A jerk
              will bring your vehicle's angle to a complete stop. But holding back also allows you to lock the angle of
              the vehicle while allowing you to accelerate. <br /> However, you don't need to be high in the sky for Air
              Control to be important. As soon as your vehicle is off the ground, you need to think about your Air Control.
              When you come to the top of a hill or go over a bump, even if it's only for a fraction of a second, you're
              in the air. In these cases, you have very little time to adjust the vehicle's tilt and lock it, but these small
              optimisations will save you a lot of time.
            </p>
            <h2>Managing gear change</h2>
            <p>
              Now that you know the three main points of Trackmania's driving, there is one last point to consider, and
              not the least. As you may have noticed, acceleration is not linear in Trackmania. And for good reason,
              since your vehicle automatically shifts gearsThis means that there are speed thresholds where your vehicle
              is no longer able to accelerate, just as you would in a real car. This means that there are speed
              thresholds where your vehicle is no longer able to accelerate, while the clutch is engaged.
            </p>
            <ol>
              <li>1st gear: 0-100</li>
              <li>2nd gear: 100-160</li>
              <li>3rd gear: 160-235</li>
              <li>4th gear: 235-341</li>
              <li>5th gear: 341</li>
            </ol>
            <p>
              Knowing these thresholds will help you to maintain your speed, or rather not to lose it. If you turn
              during the clutch, you will lose speed whether you are in the air or on the ground. This loss of speed is
              even greater when you are on a surface other than the road. This is a good idea, especially when you reach
              160 and 235 km/h, which are the most common speed changes. At first you will probably have to rely on the
              speedometer behind your vehicle, but this technique will come naturally to you as you listen to the sound
              of your engine.
            </p>
            <h2>Replay and replay again</h2>
            <p>
              Once you have mastered all of the above tips, it is time to perfect your skills! You will very rarely be
              able to get the best medals on a track by riding it just once. First, you will have to learn the track
              layout by heart. Once you have it in your head, you will have to master all the obstacles, even if it
              means going over it hundreds of times by returning to the previous checkpoint. Trackmania is a game made
              for perfectionists. Even if skill is useful, it will never replace pure learning.
            </p>
            <h2>Creating your obstacles</h2>
            <p>
              Players who buy the standard Trackmania pass can access the track editor! This is not a tool reserved for
              the most creative players, as it can help you improve. Don't hesitate to create tracks filled with the
              obstacles that give you the most trouble. The editor is easy to use and allows you to train at leisure on
              customised scenarios. Well, there you go. With all this, you already have a good basis for improvement to
              start Trackmania. We'll say it again, but the real secret is to play again and again to improve and learn
              more and more. Please feel free to follow our more detailed guides if you need more information or want to
              go further.
            </p>`,
          },
          messages: [
            { user: "Mr.King", message: "Did you see the latest run in DeepDip 2? Wirtual is dominating!" },
            { user: "Mr. Prince", message: "Yeah, he's really pushing the limits. Unbelievable skills!" },
            {
              user: "GamerQueen",
              message: "His control on those sharp turns is next-level. This is intense!",
            },
            {
              user: "Mr.King",
              message: "I think he might actually break the record. His consistency is unreal.",
            },
            {
              user: "Mr. Prince",
              message: "No doubt, but don't count out Riolu. He's been super consistent too.",
            },
            {
              user: "GamerQueen",
              message: "Riolu's precision is amazing. It's going to be a close race for sure.",
            },
            {
              user: "Mr.King",
              message:
                "DeepDip 2 has some insane sections. Who do you think will handle the tricky parts better?",
            },
            {
              user: "Mr. Prince",
              message:
                "Wirtual seems to have a slight edge in those tricky spots, but Riolu's overall speed is impressive.",
            },
            {
              user: "GamerQueen",
              message: "And don't forget Carl Jr. He's been practicing hard and could surprise us all.",
            },
            {
              user: "Mr.King",
              message: "True, it's still anyone's game. This is shaping up to be an epic showdown!",
            },
          ],
        },
      ];

      await eventsCollection.insertMany(dummyEvents);
    } catch (error) {
      console.error("An error occurred while resetting database:", error);
    } finally {
      await client.close();
    }
  }

  resetDatabase().catch(console.error);
}

export default {
  users: db.collection("users"),
  games: db.collection("games"),
  events: db.collection("events"),
};
