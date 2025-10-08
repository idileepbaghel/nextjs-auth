"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../component/layout";

export default function MasterMedicinePage() {
  const [formData, setFormData] = useState({
    name: "",
    brand_name: "",
    category: "",
    dosage_form: "",
    strength: "",
    manufacturer: "",
    description: "",
    default_selling_price: "",
    reorder_level: "",
    status: "Active",
  });

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all medicines on mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  async function fetchMedicines() {
    setLoading(true);
    try {
      const res = await fetch("/api/medicine");
      const data = await res.json();
      if (data.success) {
        setMedicines(data.medicines);
      } else {
        setError(data.error || "Failed to load medicines");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/masterMedicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Medicine added successfully!");
        setFormData({
          name: "",
          brand_name: "",
          category: "",
          dosage_form: "",
          strength: "",
          manufacturer: "",
          description: "",
          default_selling_price: "",
          reorder_level: "",
          status: "Active",
        });
        fetchMedicines();
      } else {
        setError(data.message || "Failed to add medicine");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Master Medicine</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Medicine Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="brand_name"
          placeholder="Brand Name"
          value={formData.brand_name}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="dosage_form"
          placeholder="Dosage Form (e.g. Tablet)"
          value={formData.dosage_form}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="strength"
          placeholder="Strength (e.g. 500mg)"
          value={formData.strength}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="default_selling_price"
          placeholder="Default Selling Price"
          value={formData.default_selling_price}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="reorder_level"
          placeholder="Reorder Level"
          value={formData.reorder_level}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded-lg"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded-lg md:col-span-2"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg md:col-span-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Medicine"}
        </button>
      </form>

      {/* Alerts */}
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      {/* Medicines Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 border">Name</th>
              <th className="py-2 px-3 border">Brand</th>
              <th className="py-2 px-3 border">Category</th>
              <th className="py-2 px-3 border">Strength</th>
              <th className="py-2 px-3 border">Price</th>
              <th className="py-2 px-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-3 text-gray-500">
                  No medicines found
                </td>
              </tr>
            )}
            {medicines.map((m) => (
              <tr key={m._id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border">{m.name}</td>
                <td className="py-2 px-3 border">{m.brand_name}</td>
                <td className="py-2 px-3 border">{m.category}</td>
                <td className="py-2 px-3 border">{m.strength}</td>
                <td className="py-2 px-3 border">{m.default_selling_price}</td>
                <td className="py-2 px-3 border">{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
}
