const express = require('express');
const app = express();
const port = 3000;

const talks = [
    {
        "title": "The Future of Artificial Intelligence",
        "speakers": ["Dr. Evelyn Reed"],
        "category": ["AI", "Machine Learning"],
        "duration": "1 hour",
        "description": "A deep dive into the future of AI and its impact on society."
    },
    {
        "title": "Quantum Computing: A New Paradigm",
        "speakers": ["Prof. Kenji Tanaka"],
        "category": ["Quantum Computing", "Physics"],
        "duration": "1 hour",
        "description": "Exploring the principles of quantum computing and its potential applications."
    },
    {
        "title": "Web3 and the Decentralized Future",
        "speakers": ["Aisha Khan", "Ben Carter"],
        "category": ["Web3", "Blockchain"],
        "duration": "1 hour",
        "description": "Understanding the next evolution of the internet with Web3 and blockchain technologies."
    },
    {
        "title": "The Rise of Serverless Architectures",
        "speakers": ["Dr. Maria Petrova"],
        "category": ["Cloud Computing", "Serverless"],
        "duration": "1 hour",
        "description": "A look into the benefits and challenges of serverless computing."
    },
    {
        "title": "Cybersecurity in a Post-Quantum World",
        "speakers": ["David Chen"],
        "category": ["Cybersecurity", "Quantum Computing"],
        "duration": "1 hour",
        "description": "How to prepare for the cybersecurity challenges in the era of quantum computers."
    },
    {
        "title": "Ethical AI: Navigating the Moral Maze",
        "speakers": ["Dr. Lena Hanson", "Dr. Samuel Jones"],
        "category": ["AI", "Ethics"],
        "duration": "1 hour",
        "description": "A discussion on the ethical considerations and responsibilities in developing AI."
    }
];

app.use(express.static('public'));

app.get('/api/talks', (req, res) => {
    // Artificial delay for testing the loading indicator
    setTimeout(() => {
        res.json(talks);
    }, 1000); // 1-second delay
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
