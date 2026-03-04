export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Details</h1>
      <p>Job ID: {params.id}</p>
      <p>Job detail page - to be implemented</p>
    </div>
  );
}
