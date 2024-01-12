# Your Therapy - Mental Wellness Hub 🌈

Empower your mental well-being with Your Therapy! Seamlessly communicate in 102 languages with YourTherapy-Bot, leveraging Azure Language Translator. Detect depression likelihood through sentiment analysis powered by Distil BERT. TheraPedia, backed by Gemini AI, enhances health literacy with multilingual support. No registration is needed, ensuring discreet conversations. Explore articles on mental health for holistic wellness. Experience inclusivity in a stigma-free environment! 
This README file will guide you through the project's installation, prerequisites, and usage guidelines.

## Overview

Your Therapy is a multifaceted platform that incorporates two major features:

1. **YourTherapy-Bot:**
   - **Multilingual Support:** Utilizing Azure Language Translator, YourTherapy-Bot supports 102 languages. Users can express themselves in their preferred language.
   - **Sentiment Analysis:** Users are prompted with 10 psychological questions from  the [Beck Depression Inventory (BDI)](https://en.wikipedia.org/wiki/Beck_Depression_Inventory), and based on their responses, sentiment analysis is performed. This analysis, powered by the Distil BERT Language Model fine-tuned by Assembly Ai, helps identify the likelihood of the user experiencing depression.
   - **Discreet Interaction:** With no registration or login required, conversations between the user and the bot remain discreet, thereby mitigating societal stigma.

2. **TheraPedia:**
   - **Health Literacy Enhancement:** TheraPedia is powered by Gemini AI (Google) and fine-tuned by our team. It provides insightful responses to user queries about mental health, aiming to enhance health literacy.
   - **Multilingual Support:** TheraPedia offers responses in multiple languages, ensuring accessibility to a diverse user base.

Additionally, Your Therapy provides a wealth of information through articles related to mental health, contributing to a holistic approach to mental well-being.

### Technologies Used:

- **Google Generative AI (GEMINI):**
  - Powering the main conversational model.
  - Utilized for generating responses based on user input.
  - Ensures a natural and context-aware conversation.

- **Distil BERT Language Model:**
  - Integrated for sentiment analysis of user responses.
  - Analyzes sentiments to provide empathetic and tailored support.

- **Azure Language Translator:**
  - Enables multilingual capabilities.
  - Users can interact with the ChatBot in various languages, enhancing accessibility.
## Installation

Follow these steps to set up Your Therapy:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sagnik-datta-02/HackForHealth.git
   cd HackForHealth.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Backend Setup:**
   Set up the backend by following the instructions in the [backend repository](https://github.com/Swapnendu003/hack-for-health-server-side).

## Prerequisites

Ensure the following prerequisites are installed:

- Node.js and npm
- Git
- [Azure Language Translator](https://azure.microsoft.com/en-us/services/cognitive-services/translator/)
- [Distil BERT Language Model](https://huggingface.co/assemblyai/distilbert-base-uncased-sst2)
- [Gemini AI](https://cloud.google.com/natural-language)

## Usage Guidelines

1. **Start the frontend:**
   ```bash
   npm run dev
   ```
   This command initiates the frontend using Vite+React and the MUI framework.

2. **Backend Setup:**
   Follow the backend setup instructions and start the server.

3. **Access Your Therapy:**
   Open your web browser and navigate to `http://localhost:5143`.

Feel free to explore and make the most of the various features and functionalities offered by Your Therapy.

## External Dependencies

Your Therapy relies on the following external dependencies to deliver its functionality:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [MUI (Material-UI)](https://mui.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Azure Language Translator](https://azure.microsoft.com/en-us/services/cognitive-services/translator/)
- [Distil BERT Language Model](https://huggingface.co/assemblyai/distilbert-base-uncased-sst2)
- [Gemini AI](https://cloud.google.com/natural-language)

Your Therapy is designed to be an inclusive and accessible platform for mental health support. If you encounter any issues or have suggestions, feel free to raise them in the [issue tracker](https://github.com/sagnik-datta-02/HackForHealth/issues).
