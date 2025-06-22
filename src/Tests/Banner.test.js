import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '../components/Banner/Banner.jsx'; 
import homeBannerImage from '../assets/images/homeBanner.jpg';

// Mock de l'image pour les tests
const mockImageSrc = "test-banner.jpg";
const mockAltText = "Bannière de test";
const mockText = "Texte de la bannière";

describe('Composant Banner', () => {
  test('doit rendre l\'image avec le bon src et alt', () => {
    render(<Banner imageSrc={mockImageSrc} altText={mockAltText} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', mockImageSrc);
    expect(imageElement).toHaveAttribute('alt', mockAltText);
  });

  test('doit afficher le texte et l\'overlay si showTextOverlay est true et text est fourni', () => {
    render(
      <Banner
        imageSrc={mockImageSrc}
        altText={mockAltText}
        text={mockText}
        showTextOverlay={true}
      />
    );
    expect(screen.getByText(mockText)).toBeInTheDocument();
    // Vérifie la présence de l'overlay (tu peux ajouter une data-testid à l'overlay si besoin)
    const overlay = screen.getByText(mockText).closest('.banner-overlay'); // Ou une autre façon de cibler l'overlay
    expect(overlay).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: mockText })).toBeInTheDocument(); // Le texte est un h1
  });

  test('ne doit pas afficher le texte ni l\'overlay si showTextOverlay est false', () => {
    render(
      <Banner
        imageSrc={mockImageSrc}
        altText={mockAltText}
        text={mockText}
        showTextOverlay={false}
      />
    );
    expect(screen.queryByText(mockText)).not.toBeInTheDocument();
    // Pour l'overlay, si sa présence dépend du texte, cette assertion suffit.
    // Sinon, il faudrait une manière plus directe de le cibler.
    const bannerContainer = screen.getByRole('img').closest('.banner-container');
    expect(bannerContainer).toHaveClass('banner-no-text'); // Vérifie la classe conditionnelle
  });

  test('ne doit pas afficher le texte si text n\'est pas fourni, même si showTextOverlay est true', () => {
    render(
      <Banner
        imageSrc={mockImageSrc}
        altText={mockAltText}
        showTextOverlay={true}
        // text prop est omise
      />
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument(); // Aucun h1 ne devrait être présent
  });

  test('doit correspondre au snapshot avec texte', () => {
    const { container } = render(
      <Banner
        imageSrc={mockImageSrc}
        altText={mockAltText}
        text={mockText}
        showTextOverlay={true}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('doit correspondre au snapshot sans texte', () => {
    const { container } = render(
      <Banner
        imageSrc={mockImageSrc}
        altText={mockAltText}
        showTextOverlay={false}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});