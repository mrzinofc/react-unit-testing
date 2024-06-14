import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {
  it('should render list items', async () => {
    const {rerender, queryByText} = render(<List initialItems={['Murilo', 'Neymar', 'CR7']} />);

    expect(screen.getByText('Murilo')).toBeInTheDocument();
    expect(screen.getByText('Neymar')).toBeInTheDocument();
    expect(screen.getByText('CR7')).toBeInTheDocument();

    rerender(<List initialItems={['Messi']} />);
    
    expect(screen.getByText('Messi')).toBeInTheDocument();
    
    expect(queryByText('CR7')).not.toBeInTheDocument(); 
  });

  it('should be able to add new item to the list', () => {
    render(<List initialItems={[]} />);

    const inputElement = screen.getByPlaceholderText('Novo item');
    const addButton = screen.getByText('Adicionar');

    userEvent.type(inputElement, 'Novo');
    userEvent.click(addButton);

    // Esperar até o item aparecer no DOM
    expect(screen.findByText('Novo')).resolves.toBeInTheDocument();
  });

  it('should be able to add remove item from the list', async () => {
    const { queryByText, getAllByText } = render(<List initialItems={['Murilo']}/>);

    const removeButtons = getAllByText('Remover');
    
    userEvent.click(removeButtons[0]);

    
    await waitFor(() => {
      expect(queryByText('Murilo')).not.toBeInTheDocument();
    });
  });
});
