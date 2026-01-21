/**
 * Assembles a complete report by combining year-based content with birthday-specific data
 */

import yearData from '../data/years/1988.json';
import birthdayData from '../data/birthdays.json';

export function assembleReport(birthDate = '1988-06-09') {
  const [year, month, day] = birthDate.split('-');
  const monthDay = `${month}-${day}`;
  
  // Get year-specific content (11 sections)
  const yearContent = yearData;
  
  // Get birthday-specific data
  const birthday = birthdayData[monthDay] || {
    rank: 183,
    percentile: 50,
    celebrities: [],
    conception_estimate_offset: -274
  };
  
  // Calculate conception date
  const birthDateObj = new Date(birthDate);
  const conceptionDate = new Date(birthDateObj);
  conceptionDate.setDate(conceptionDate.getDate() + birthday.conception_estimate_offset);
  
  // Format dates for display
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedBirthDate = birthDateObj.toLocaleDateString('en-US', options);
  const formattedConceptionDate = conceptionDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Build birthday section HTML
  const birthdayHtml = `
    <h2>Birthday Commonality</h2>
    <div class="birthday-stats">
      <p class="rank-display">
        <span class="rank-number">#${birthday.rank}</span>
        <span class="rank-label">out of 366 possible birthdays</span>
      </p>
      <p class="rank-explanation">
        ${birthday.rank <= 100 
          ? `Your birthday is in the top third of most common birthdays. September birthdays dominate the top spots—apparently everyone's parents were celebrating the holidays in similar ways.`
          : birthday.rank <= 200 
          ? `Your birthday falls right in the middle of the pack. Not exceptionally common, not particularly rare—just statistically unremarkable, which is probably the most relatable thing about you.`
          : `Your birthday is actually fairly uncommon. ${month === '12' || month === '01' ? 'Holiday babies are statistically rare—turns out people have better things to do in late December than give birth.' : 'Fewer people share your birthday, which means smaller group birthday parties but more cake per capita.'}`
        }
      </p>
      <p>You're in the <strong>${birthday.percentile}th percentile</strong> for birthday commonality. ${birthday.percentile > 50 ? 'More common than average.' : 'Less common than average.'}</p>
      <p>Based on typical pregnancy timelines, you were likely conceived around <strong>${formattedConceptionDate}</strong>.</p>
    </div>
    <div class="celebrity-birthdays">
      <h3>Famous People Born on ${month}/${day}</h3>
      <ul>
        ${birthday.celebrities.map(celeb => `<li>${celeb}</li>`).join('')}
      </ul>
    </div>
  `;

  // Assemble complete report
  return {
    birthDate: formattedBirthDate,
    birthYear: parseInt(year),
    generation: yearContent.generation,
    generationSpan: yearContent.generation_span,
    birthdayRank: birthday.rank,
    birthdayPercentile: birthday.percentile,
    sections: {
      birthday: { 
        id: 'birthday',
        title: 'Birthday Commonality',
        html: birthdayHtml 
      },
      childhood: { 
        id: 'childhood',
        title: 'Childhood Context',
        html: yearContent.sections.childhood_context.html 
      },
      generation: { 
        id: 'generation',
        title: 'Generational Identity',
        html: yearContent.sections.generational_identity.html 
      },
      popCulture: { 
        id: 'pop-culture',
        title: 'Pop Culture',
        html: yearContent.sections.pop_culture.html 
      },
      technology: { 
        id: 'technology',
        title: 'Technology Timeline',
        html: yearContent.sections.technology.html 
      },
      history: { 
        id: 'history',
        title: 'Historical Milestones',
        html: yearContent.sections.historical_milestones.html 
      },
      career: { 
        id: 'career',
        title: 'Career & Professional',
        html: yearContent.sections.career.html 
      },
      relationships: { 
        id: 'relationships',
        title: 'Relationships',
        html: yearContent.sections.relationships.html 
      },
      financial: { 
        id: 'financial',
        title: 'Financial Psychology',
        html: yearContent.sections.financial.html 
      },
      blindSpots: { 
        id: 'blind-spots',
        title: 'Blind Spots',
        html: yearContent.sections.blind_spots.html 
      },
      roadmap: { 
        id: 'roadmap',
        title: 'Life Roadmap',
        html: yearContent.sections.life_roadmap.html 
      },
      comparison: { 
        id: 'comparison',
        title: 'Generational Comparison',
        html: yearContent.sections.comparison.html 
      },
    },
    yearEvents: yearContent.year_events,
    metadata: yearContent.metadata
  };
}

// Section order for navigation
export const SECTION_ORDER = [
  'birthday',
  'childhood',
  'generation',
  'popCulture',
  'technology',
  'history',
  'career',
  'relationships',
  'financial',
  'blindSpots',
  'roadmap',
  'comparison'
];

export default assembleReport;
