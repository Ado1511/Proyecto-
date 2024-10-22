import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "flowbite-react";
import { TCard } from '../../Types/TCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardSchema } from '../../validations/UpdateCard.joi'; 
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditCard: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<TCard | null>(null);
  const token = localStorage.getItem('token') || '';

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TCard>({
    resolver: yupResolver(cardSchema),
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65424d35cb6bcb58697bab4a`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInitialData(response.data);
        reset(response.data); // Populate the form with existing data
      } catch (error) {
        console.error('Error fetching card:', error);
        toast.error("Error fetching card data.");
      }
    };

    fetchCard();
  }, [cardId, token, reset]);

  const onSubmit = async (data: TCard) => {
    setLoading(true);
    try {
      // Exclude likes from update if not needed
      const { likes, ...dataToUpdate } = data; // Handle likes appropriately
      await updateCard(cardId, { ...dataToUpdate, user_id: initialData?.user_id }, token);
      toast.success("Card updated successfully!");
      reset();
    } catch (error) {
      console.error('Error updating card:', error);
      toast.error("Error updating card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-start gap-10 m-auto" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-6 m-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-dark">Edit Card</h1>

        {/* Title */}
        <TextInput
          {...register('title')}
          placeholder="Title"
          className="mb-2"
          color={errors.title ? "failure" : "gray"}
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}

        {/* Subtitle */}
        <TextInput
          {...register('subtitle')}
          placeholder="Subtitle"
          className="mb-2"
          color={errors.subtitle ? "failure" : "gray"}
        />
        {errors.subtitle && <p className="text-red-600">{errors.subtitle.message}</p>}

        {/* Description */}
        <textarea
          {...register('description')}
          placeholder="Description"
          className={`mb-2 ${errors.description ? "border-red-600" : "border-gray-300"} border p-2 rounded-md w-full`}
        />
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}

        {/* Image URL */}
        <TextInput
          {...register('image.url')}
          placeholder="Image URL"
          className="mb-2"
          color={errors.image?.url ? "failure" : "gray"}
        />
        {errors.image?.url && <p className="text-red-600">{errors.image.url.message}</p>}

        {/* Phone */}
        <TextInput
          {...register('phone')}
          placeholder="Phone"
          className="mb-2"
          color={errors.phone ? "failure" : "gray"}
        />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

        {/* Email */}
        <TextInput
          {...register('email')}
          placeholder="Email"
          className="mb-2"
          color={errors.email ? "failure" : "gray"}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        {/* Web */}
        <TextInput
          {...register('web')}
          placeholder="Website"
          className="mb-2"
          color={errors.web ? "failure" : "gray"}
        />
        {errors.web && <p className="text-red-600">{errors.web.message}</p>}

        {/* Address - City */}
        <TextInput
          {...register('address.city')}
          placeholder="City"
          className="mb-2"
          color={errors.address?.city ? "failure" : "gray"}
        />
        {errors.address?.city && <p className="text-red-600">{errors.address.city.message}</p>}

        {/* Submit Button */}
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Updating..." : "Update Card"}
        </Button>
      </form>
    </div>
  );
};

export default EditCard;





function updateCard(_cardId: string | undefined, _arg1: { user_id: string | undefined; _id: string; title: string; subtitle?: string; description: string; phone?: string; email?: string; web?: string; image?: { url: string; alt?: string; }; address?: { state?: string; country?: string; city?: string; street?: string; houseNumber?: number; zip?: number; }; bizNumber?: number; }, token: string) {
  throw new Error("Function not implemented.");
}

