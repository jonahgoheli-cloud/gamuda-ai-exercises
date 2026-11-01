import { useState } from "react";

function DynamicList() {
    const [items, setItems] = useState([
        { id: 1, name: 'Apple', category: 'fruit'},
        { id: 2, name: 'Carrot', category: 'vegetable'},
        { id: 3, name: 'Banana', category: 'fruit'}
    ]);
    const [newItem, setNewItem] = useState('');
    // Track which item is currently being edited
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const addItem = () => {
        if (newItem.trim()) {
            setItems(prev => [ ...prev, {
                id: Date.now(),
                name: newItem.trim(),
                category: 'other'
            }]);
            setNewItem('');
        }
    };

    const deleteItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setEditingText(item.name);
    };

    const saveEdit = (id) => {
        if (editingText.trim()) {
            setItems(prev => prev.map(item => 
                item.id === id ? { ...item, name: editingText.trim() } : item
            ));
        }
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div>
            <div>
                <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                />
                <button onClick={addItem}>Add</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {items.map(item => (
                    <li
                        key={item.id}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            margin: '5px 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {editingId === item.id ? (
                            /* --- INLINE EDIT MODE --- */
                            <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveEdit(item.id);
                                        if (e.key === 'Escape') cancelEdit();
                                    }}
                                    autoFocus
                                />
                                <button onClick={() => saveEdit(item.id)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            /* --- NORMAL VIEW MODE --- */
                            <>
                                <span>{item.name} ({item.category})</span>
                                <div>
                                    <button onClick={() => startEditing(item)}>Edit</button>
                                    <button 
                                        onClick={() => deleteItem(item.id)} 
                                        style={{ marginLeft: '5px' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DynamicList;