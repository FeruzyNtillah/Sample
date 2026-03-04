export default function ImportReportPage({ params }: { params: { type: string; id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Import Report</h1>
      <p>Report Type: {params.type}</p>
      <p>Report ID: {params.id}</p>
      <p>Import report page - to be implemented</p>
    </div>
  );
}
