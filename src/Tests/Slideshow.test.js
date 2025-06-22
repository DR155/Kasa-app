import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slideshow from '../components/Slideshow/Slideshow.jsx';

// Mock des composants Font Awesome pour les tests
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => <i data-testid="fa-icon" {...props}></i>, // Remplace l'icône par un simple <i> avec un data-testid
}));
jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faChevronLeft: 'chevron-left-icon', // Mock les icônes elles-mêmes
  faChevronRight: 'chevron-right-icon',
}));

describe('Composant Slideshow', () => {
  const mockPicturesSingle = ["image1.jpg"];
  const mockPicturesMultiple = ["image1.jpg", "image2.jpg", "image3.jpg"];

  test('doit rendre "Aucune image disponible" si aucune image n\'est fournie', () => {
    render(<Slideshow pictures={[]} />);
    expect(screen.getByText("Aucune image disponible")).toBeInTheDocument();
  });

  test('doit afficher une seule image sans contrôles si une seule image est fournie', () => {
    render(<Slideshow pictures={mockPicturesSingle} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', mockPicturesSingle[0]);
    expect(screen.queryByLabelText('Image précédente')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Image suivante')).not.toBeInTheDocument();
    expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument(); // Recherche le format du compteur "1/3"
  });

  describe('Avec plusieurs images', () => {
    beforeEach(() => {
      // On rend le composant avec plusieurs images avant chaque test de ce bloc
      render(<Slideshow pictures={mockPicturesMultiple} />);
    });

    test('doit afficher la première image et les contrôles', () => {
      const imageElement = screen.getByRole('img');
      expect(imageElement).toHaveAttribute('src', mockPicturesMultiple[0]);
      expect(screen.getByLabelText('Image précédente')).toBeInTheDocument();
      expect(screen.getByLabelText('Image suivante')).toBeInTheDocument();
      expect(screen.getByText(`1/${mockPicturesMultiple.length}`)).toBeInTheDocument();
    });

    test('le bouton "suivant" doit afficher l\'image suivante et mettre à jour le compteur', () => {
      fireEvent.click(screen.getByLabelText('Image suivante'));
      expect(screen.getByRole('img')).toHaveAttribute('src', mockPicturesMultiple[1]);
      expect(screen.getByText(`2/${mockPicturesMultiple.length}`)).toBeInTheDocument();
    });

    test('le bouton "suivant" doit revenir à la première image après la dernière', () => {
      const nextButton = screen.getByLabelText('Image suivante');
      // Clique jusqu'à la dernière image
      for (let i = 0; i < mockPicturesMultiple.length -1; i++) {
        fireEvent.click(nextButton);
      }
      expect(screen.getByRole('img')).toHaveAttribute('src', mockPicturesMultiple[mockPicturesMultiple.length - 1]);
      expect(screen.getByText(`${mockPicturesMultiple.length}/${mockPicturesMultiple.length}`)).toBeInTheDocument();

      // Clique encore une fois pour revenir au début
      fireEvent.click(nextButton);
      expect(screen.getByRole('img')).toHaveAttribute('src', mockPicturesMultiple[0]);
      expect(screen.getByText(`1/${mockPicturesMultiple.length}`)).toBeInTheDocument();
    });

    test('le bouton "précédent" doit afficher l\'image précédente et mettre à jour le compteur', () => {
      // Aller à la deuxième image d'abord
      fireEvent.click(screen.getByLabelText('Image suivante'));
      // Puis cliquer sur précédent
      fireEvent.click(screen.getByLabelText('Image précédente'));
      expect(screen.getByRole('img')).toHaveAttribute('src', mockPicturesMultiple[0]);
      expect(screen.getByText(`1/${mockPicturesMultiple.length}`)).toBeInTheDocument();
    });

    test('le bouton "précédent" doit aller à la dernière image depuis la première', () => {
      fireEvent.click(screen.getByLabelText('Image précédente'));
      expect(screen.getByRole('img')).toHaveAttribute('src', mockPicturesMultiple[mockPicturesMultiple.length - 1]);
      expect(screen.getByText(`${mockPicturesMultiple.length}/${mockPicturesMultiple.length}`)).toBeInTheDocument();
    });
  });

  test('doit correspondre au snapshot avec plusieurs images', () => {
    const { container } = render(<Slideshow pictures={mockPicturesMultiple} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
 // Tu pourrais ajouter un test pour vérifier que les bonnes icônes sont passées au mock
  test('doit utiliser les bonnes icônes Font Awesome', () => {
     render(<Slideshow pictures={mockPicturesMultiple} />);
     const icons = screen.getAllByTestId('fa-icon');
     expect(icons[0]).toHaveAttribute('icon', 'chevron-left-icon');
     expect(icons[1]).toHaveAttribute('icon', 'chevron-right-icon');
  });

});