REQUIREMENTS
You will need to install yarn and node.js. Both are available from APT.

CONNECTING TO MYSQL
Open WebServer/Routes/queries.js
Change the values of the config to match your local mysql set up. By default the xdev services uses port 33060.
xdev was included and already running in my installation of mysql on ubuntu.

User/password refers to user/password accounts for your specifc mysql installation not your linux/os user account.
My was configured when I installed mysql.
Host: is the ip of your database host. In my case I was running it on ubuntu in WSL on my personal machine so its localhost.

RUNNING THE PROJECT
Simply navigate to the root directory and run yarn, and then yarn start.
Project by default will run on port 3000


ALL QUERIES USED FOR PART 1 ARE STORED PROCEDURES
DO NOT TRY TO FIND THE RAW QUERIES IN THE PROJECT CODE CAUSE THEY'RE NOT THERE

Run this command in the mysql shell before starting up MySQL Workbench
Or run it in a MySQL workbench session, and then restart the session.
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY','')); This disables group by requirements for the select clause but should only 
ever be used when certain levels of integrity are insured with the data being grouped.

I assume BarFood, Beer, Bar all have no duplicates even though in practice bar doesn't have enough fields to truly identify a bar. 
I assume duplicate transactions is simply appending additional orders to the bill. I.E if I decide to order another plate of fries after getting my food, that might
look like a duplicate transaction in the transactions table, but the total will still match the info in Bills.
Perhaps, for the next semester, as a validation query, ask to check if the sum of transactions matches the price in Bills for a given bill_id.

I added a SellsItem table as a sort of superclass table for SellsFood and SellsBeer. This way we can ensure every item in transactions is actually sold by that bar.

I didn't notice this until literally making the video, but the js mysql connector reads back date objects as complete datetime objects. So even though the column
value is set as date in the schema, it automtaically appends the hours/minutes/seconds/milliseconds as all 0s. Mysql doesn't exhibit this behavior, and litst the dates as
expected.

Updating chart options is not working as expected. Autoscaling, depending on the value, will set the lowest tick on the graph to be the lowest value in the chart,
meaning it has no visible bar. Because I hardcoded some stuff for drinkers its not a problem in any of those graphs, but it is a problem for Beer and Bar. Simply hover
the lable on the x-axis to see what the actual value of the bar is. Or you can just look at the y axis and the lowest value. For bar and beer, only entries
that are not null will be plotted. So if there are only 6 drinkers of a specific beer you'll only see 6 drinker as an example. 





NOT IMPORTANT INFORMATION, JUST A LITTLE JOURNAL THING

Updating Bar always throws a foreign key restraint error specifically in the transactions table but not in the bills table. 
I mapped out my schema and verified that every table getting referenced by transactions directly or indirectly also references Bar directly.
I also verified that this is true not only on paper, but also in mysql workbench. I suspect what is happening here is that there are multiple cascade paths for the update.
Because of this, mysql is either recursively updating things and reaching the maximum recursive update limit of 15 and terminating on that table, or the way
updates are scheduled causes an attempt to update Transactions before the cascade path going through SellsItem can execute, throwing a violation.

I'm not sure how to fix this short of triggers or disabling foriegn key checks for the transaction. Triggers are beyond my knowledge right now, and disabling
checks just sounds like bad behavior. 

I had a similar issue with the SellsFood -> SellsItem constraint. I just kept deleteing and re-adding the foriegn key. I tried a few different ways of defnining the
key syntatically too. Eventually it just kinda worked? I'm still totally confused as to what the problem was but yeah, there's some weird stuff happening with 
defining composite keys. For example, a few keys when I was doing this to start just didn't show up in mysql workbench, but showed up when using SHOW CREATE TABLE.
Or they showed up but had no index. Or they had an index but didn't show up. At this point I'm out of time to go nuclear and re-create everything, but I stand by the schema design.

Finally: Node js was a mistake for pure time management. I did this because I really wanted to learn express for something else, but I had to end up learning a bunch of stuff I didn't care about too, 
so it took like twice as long as it probably would've if I had just used the included project stuff. There were a couple really particular issues I ended up having
with chart.js and some mysql connector things that were really hard to find on google and just non-existent in the docs, so I had to do a whole lot of testing
to try and figure out how the code works, and then go back and actually apply it, some of it I ended up just not needing or I could've done by hardcoding/just doing it in way
more lines of code. Take, for example, the difference between chartDrinker and chartBar or chartBeer. Of course I'm glad I learned it but it was stressful given the amount of other coursework I still had.
 