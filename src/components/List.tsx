import { useState } from "react";

type ListProps = {
    initialItems: string[]
}

function List({ initialItems}: ListProps) {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(initialItems);

  function addToList() {
    if (newItem.trim()) {
      setList(state => [...state, newItem]);
      setNewItem(''); // Limpar o campo após adicionar
    }
  }

  function removeFromList(itemToRemove: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== itemToRemove));
    }, 500);
  }

  return (
    <>
      <input
        placeholder="Novo item"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => (
          <li key={item}>
            {item} 
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;