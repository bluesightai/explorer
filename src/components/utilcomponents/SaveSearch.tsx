// import { useState } from 'react';
// import { useAppState } from '../../hooks/AppContext';
// import { useSupabase } from '../../hooks/useSupabase';

// const SaveSearchButton = () => {
//     const { supabase } = useSupabase()
//     const { state } = useAppState();
//     const [name, setName] = useState('');
//     const [isExpanded, setIsExpanded] = useState(false);

//     const handleSave = async () => {
//         if (!name) {
//             alert('Please enter a name for the search');
//             return;
//         }

//         try {
//             // const { error } = await supabas
//                 .from('saved_searches')
//     .insert({
//         name: name,
//         top_k: state.sliderValue,
//         search_area_id: state.areaId,
//         negative_ids: state.negativeIDs,
//         target_ids: state.targetBoundingBoxes.map(box => box.id),
//         result_ids: state.resultBoundingBoxes.map(box => box.id)
//     });

// if (error) throw error;

// alert('Search saved successfully!');
// setName('');
//         } catch (error) {
//     console.error('Error saving search:', error);
//     alert('Failed to save search. Please try again.');
// }
//     };

// const toggleExpand = () => setIsExpanded(!isExpanded);

// return (
//     <div className="save-search-container">
//         <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter search name"
//             className="search-name-input"
//         />
//         <button onClick={toggleExpand} className="toggle-details-button">
//             {isExpanded ? 'Hide Details' : 'Show Details'}
//         </button>
//         {isExpanded && (
//             <div className="search-details">
//                 <p>Target Boxes: {state.targetBoundingBoxes.length}</p>
//                 <p>Result Boxes: {state.resultBoundingBoxes.length}</p>
//                 <p>Negative Boxes: {state.negativeIDs.length}</p>
//                 <p>Area ID: {state.areaId}</p>
//                 <p>Top K: {state.sliderValue}</p>
//             </div>
//         )}
//         <button onClick={handleSave} className="save-button">Save Search</button>
//     </div>
// );
// };

// export default SaveSearchButton;
