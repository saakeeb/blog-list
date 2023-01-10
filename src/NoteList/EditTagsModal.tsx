import { EditTagsModalProps } from './NoteListProps';

const EditTagsModal = ({
    availableTags,
    show,
    handleClose,
    onDeleteTag,
    onUpdateTag
}: EditTagsModalProps) => {
    return (
        <>
            {
                show ? (
                    
                    <div
                        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-full h-full max-w-md md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="p-4 pb-3 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl block font-semibold text-gray-900 dark:text-white">
                                        Edit Tags
                                    </h3>
                                    <p className=" mt-1 text-sm block text-gray-400">Edit the tags if necessary...</p>
                                    <button
                                        onClick={() => handleClose()}
                                        type="button"
                                        className="absolute -top-3 -right-3 text-gray-500 hover:text-gray-900 bg-gray-200 rounded-full hover:bg-gray-300 text-2xl w-10 h-10 p-1.5 ml-auto inline-flex items-center justify-center"
                                        data-modal-hide="popup-modal"
                                    >
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <form>
                                        {
                                            availableTags.map(tag => (
                                                <div className="relative text-gray-600 focus-within:text-gray-400" key={tag.id}>
                                                    <input
                                                        // shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                        className="w-full py-2 text-sm shadow appearance-none border rounded-md px-3 focus:outline-none focus:shadow-outline focus:text-gray-900 mb-2"
                                                        type='text'
                                                        value={tag.label}
                                                        onChange={e => onUpdateTag(tag.id, e.target.value)}
                                                    />
                                                    <span className="absolute inset-y-1 right-2 items-center pl-2 ">
                                                        <button
                                                            type="button"
                                                            className="p-1 focus:outline-none focus:shadow-outline hover:bg-pink-200 hover:text-pink-700"
                                                            onClick={() => onDeleteTag(tag.id)}
                                                        >
                                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            <span className="sr-only">Delete Tags</span>
                                                        </button>
                                                    </span>
                                                </div>)
                                            )
                                        }
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </>
    )
};

export default EditTagsModal;