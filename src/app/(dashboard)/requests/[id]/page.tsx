export default function RequestDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Request Details</h1>
      <p>Request ID: {params.id}</p>
      <p>Request detail page - to be implemented</p>
    </div>
  );
}
