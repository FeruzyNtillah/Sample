export default function ReportsPage({ params }: { params: { type: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <p>Report Type: {params.type}</p>
      <p>Reports page - to be implemented</p>
    </div>
  );
}
