// Learn more about testing here: https://create-react-app.dev/docs/running-tests/
import '@testing-library/jest-dom';

// Importe les bibliothèques Font Awesome nécessaires
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Ajoute les icônes à la bibliothèque Font Awesome globale
library.add(faChevronLeft, faChevronRight);
