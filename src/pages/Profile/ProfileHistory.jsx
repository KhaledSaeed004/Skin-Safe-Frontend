import History from "../History";

export default function ProfileHistory() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Previous Reports History</h2>
      <p className="text-gray-600">
        Your skin analysis history will appear here.
      </p>
      <History />
    </div>
  );
}
