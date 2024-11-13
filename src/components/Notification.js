// Notification Component
const Notification = ({ message, type }) => {
    const bgColors = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300'
    };

    return (
        <div className={`p-4 rounded-md border ${bgColors[type]} mb-4`} role="alert">
            {message}
        </div>
    );
};

export default Notification;