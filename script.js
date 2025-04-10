document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('evaluator-form');
    const resultsSection = document.getElementById('results');

    resultsSection.style.display = 'none';

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;

        const prompt = `
        Analyze this AI project idea and evaluate it:
        Title: ${title}
        Description: ${description}
        Feedback should be short and concise, focusing on the strengths and weaknesses of the idea.
        and don't send question marks in the feedback.
        Respond in JSON with:
        {
          "category": "FinTech | EdTech | etc.",
          "pitch": "One-line pitch for the idea",
          "feedback": "AI-generated constructive feedback",
          "rating": "0.0 to 10.0"
        }`;

        try {
            // Replace you gemini API key here
            const API_KEY = "AIzaSyDERu7GekmXUpAtj0g-gQFd4l9mjfpnq6k";
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (aiText.includes('```json')) {
                aiText = aiText.split('```json')[1].split('```')[0].trim();
            } else if (aiText.includes('```')) {
                aiText = aiText.split('```')[1].split('```')[0].trim();
            }
            
            const result = JSON.parse(aiText);

            document.getElementById('category-result').textContent = result.category || 'N/A';
            document.getElementById('pitch-result').textContent = result.pitch || 'N/A';
            document.getElementById('feedback-result').textContent = result.feedback || 'N/A';

            const rating = parseFloat(result.rating || 0).toFixed(1);
            document.getElementById('rating-text').textContent = `${rating}/10`;
            document.getElementById('rating-fill').style.width = `${rating * 10}%`;

            resultsSection.style.display = 'grid';
            setTimeout(() => {
                resultsSection.classList.add('visible');
                document.querySelectorAll('.result-card').forEach(card => card.style.opacity = '1');
            }, 100);

            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (err) {
            alert('Error connecting to Gemini. Please try again.');
            console.error(err);
        }
    });
});
