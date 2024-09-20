/* eslint-disable react/no-unescaped-entities */
import Typography from '@/components/Typography';

export default function TypographyDemo() {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 font-geist">
        <div className="text-2xl">
          <p className="font-thin ...">The quick brown fox ...</p>
          <p className="font-extralight ...">The quick brown fox ...</p>
          <p className="font-light ...">The quick brown fox ...</p>
          <p className="font-normal ...">The quick brown fox ...</p>
          <p className="font-medium ...">The quick brown fox ...</p>
          <p className="font-semibold ...">The quick brown fox ...</p>
          <p className="font-bold ...">The quick brown fox ...</p>
          <p className="font-extrabold ...">The quick brown fox ...</p>
          <p className="font-black ...">The quick brown fox ...</p>
        </div>
      </div>
      <div className="col-span-1">
        <Typography type="h1">The Joke Tax Chronicles</Typography>
        <Typography type="p">
          Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom
          was running out of money.
        </Typography>
        <Typography type="h2">The King's Plan</Typography>
        <Typography type="p">
          The king thought long and hard, and finally came up with{' '}
          <a href="#" className="font-medium text-primary underline underline-offset-4">
            a brilliant plan
          </a>
          : he would tax the jokes in the kingdom.
        </Typography>
        <Typography type="blockquote">"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</Typography>
        <Typography type="h3">The Joke Tax</Typography>
        <Typography type="p">The king's subjects were not amused. They grumbled and complained, but the king was firm:</Typography>
        <Typography type="p">
          As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court
          jester named Jokester.
        </Typography>
        <Typography type="h3">Jokester's Revolt</Typography>
        <Typography type="p">
          Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet.
          The king was furious, but he couldn't seem to stop Jokester.
        </Typography>
        <Typography type="p">
          And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing,
          they couldn't stop.
        </Typography>
        <Typography type="h3">The People's Rebellion</Typography>
        <Typography type="p">
          The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.
        </Typography>
      </div>
    </div>
  );
}
