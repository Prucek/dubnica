import { load } from 'cheerio';
import { seasons } from '../src/data/results.ts';
let failed = false;
for (const season of seasons) {
  for (const team of season.teams) {
    try {
      const url = new URL(team.chessResultsUrl);
      // Validate against standings, since the schedule view contains no team names.
      url.searchParams.set('art', '0');
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const $ = load(await response.text());
      const title = $('h2').first().text().replace(/\s+/g, ' ').trim();
      const shortYear = season.year.slice(0, 5) + season.year.slice(-2);
      if (!(title.includes(season.year) || title.includes(shortYear)) || !/dubnica/i.test($('body').text())) {
        throw new Error(`Wrong season/club: ${title}`);
      }
      console.log(`OK ${season.year} / ${team.league}: ${title}`);
    } catch (error) {
      failed = true;
      console.error(`FAIL ${team.chessResultsUrl}: ${error.message}`);
    }
  }
}
if (failed) process.exitCode = 1;
