// Runtime Assembly Example
// This shows how to combine year data + birthday data at request time

/**
 * Generate a complete birthday report
 * @param {Date} birthDate - The user's birthdate
 * @returns {Object} Complete report with all sections
 */
async function generateReport(birthDate) {
    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0');
    const day = String(birthDate.getDate()).padStart(2, '0');
    const monthDay = `${month}-${day}`;
    
    // Load year-based content (cached)
    const yearData = await fetch(`/data/years/${year}.json`).then(r => r.json());
    
    // Load birthday lookup table (cached globally, only loaded once)
    const birthdayLookup = await fetch('/data/birthdays.json').then(r => r.json());
    const birthdayData = birthdayLookup[monthDay];
    
    // Calculate conception date
    const conceptionDate = new Date(birthDate);
    conceptionDate.setDate(conceptionDate.getDate() + birthdayData.conception_estimate_offset);
    const conceptionDateStr = conceptionDate.toISOString().split('T')[0];
    
    // Generate birthday commonality section (dynamic)
    const birthdaySection = generateBirthdaySection({
        monthDay,
        rank: birthdayData.rank,
        percentile: birthdayData.percentile,
        celebrities: birthdayData.celebrities,
        conceptionDate: conceptionDateStr,
        yearEvents: yearData.year_events
    });
    
    // Assemble complete report
    return {
        birth_date: `${year}-${monthDay}`,
        year: yearData.year,
        generation: yearData.generation,
        generation_span: yearData.generation_span,
        birthday_rank: birthdayData.rank,
        birthday_percentile: birthdayData.percentile,
        celebrity_birthdays: birthdayData.celebrities,
        conception_date: conceptionDateStr,
        sections: {
            birthday_commonality: birthdaySection,
            ...yearData.sections
        },
        metadata: yearData.metadata
    };
}

/**
 * Generate the birthday commonality section HTML
 * @param {Object} data - Birthday-specific data
 * @returns {Object} Section object with HTML
 */
function generateBirthdaySection(data) {
    const { monthDay, rank, percentile, celebrities, conceptionDate, yearEvents } = data;
    
    // Format the date nicely
    const [month, day] = monthDay.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`;
    const ordinalDay = getOrdinal(parseInt(day));
    
    // Format conception date
    const conceptionFormatted = new Date(conceptionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const html = `
        <h2>Your Birthday: ${formattedDate}</h2>
        
        <p>${formattedDate} ranks #${rank} out of 366 possible birthdates. That puts you ${
            rank < 183 ? 'in the more common half' : 'in the less common half'
        }—${rank < 100 ? 'pretty common' : rank > 266 ? 'relatively rare' : 'right in the middle'}. 
        About ${percentile}% of people have birthdays more common than yours.</p>
        
        <p>The math gets interesting when you work backwards. Conception likely happened around 
        ${conceptionFormatted.split(',')[0]}. That's post-summer vacation, back-to-school season. 
        Your parents were probably settling into fall routines when you became a statistical inevitability.</p>
        
        <p>You were born the year ${yearEvents.slice(0, 3).join(', ')}. ${
            yearEvents.length > 3 ? `Also: ${yearEvents.slice(3).join(', ')}.` : ''
        }</p>
        
        <p>You share your birthday with some notable company: ${celebrities.slice(0, 3).join(', ')}${
            celebrities.length > 3 ? `, and ${celebrities.slice(3).join(', ')}` : ''
        }. Not a bad group to be lumped in with.</p>
    `;
    
    return { html };
}

/**
 * Helper function to get ordinal suffix (1st, 2nd, 3rd, etc.)
 */
function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Example usage:
const userBirthdate = new Date('1988-06-09');
const report = await generateReport(userBirthdate);

console.log('Report structure:', {
    birth_date: report.birth_date,
    generation: report.generation,
    birthday_rank: report.birthday_rank,
    sections: Object.keys(report.sections),
    total_sections: Object.keys(report.sections).length
});

// Output:
// {
//   birth_date: '1988-06-09',
//   generation: 'Millennial',
//   birthday_rank: 177,
//   sections: [
//     'birthday_commonality',
//     'childhood_context',
//     'generational_identity',
//     'pop_culture',
//     'technology',
//     'historical_milestones',
//     'career',
//     'relationships',
//     'financial',
//     'blind_spots',
//     'life_roadmap',
//     'comparison'
//   ],
//   total_sections: 12
// }
