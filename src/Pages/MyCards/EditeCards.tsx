import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "flowbite-react";
import { TCard } from '../../Types/TCard';
import { updateCard } from '../../validations/UpdateCard.joi';
import { toast } from "react-toastify";

type EditCardProps = {
  cardId: string;  
  token: string;  
};

const EditCard: React.FC<EditCardProps> = ({ cardId, token }) => {
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<TCard>();

  const onSubmit = async (data: TCard) => {
    setLoading(true);
    try {
      console.log("Card ID:", cardId);  // Verifica que cardId no sea undefined
      console.log("Token:", token);      // Verifica que token no sea undefined
      
      await updateCard(cardId, data, token);
      toast.success("Card updated successfully!");
    } catch (error) {
      console.error('Error updating card:', error);
      toast.error("Error updating card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-10 m-auto" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-6 m-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-dark">Edit Card</h1>

        {/* Title */}
        <TextInput
          {...register('title', { required: "This field is required" })}
          placeholder="Title"
          className="mb-2"
          color={errors.title ? "failure" : "gray"} />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}

        {/* Subtitle */}
        <TextInput
          {...register('subtitle', { required: "This field is required" })}
          placeholder="Subtitle"
          className="mb-2"
          color={errors.subtitle ? "failure" : "gray"} />
        {errors.subtitle && <p className="text-red-600">{errors.subtitle.message}</p>}

        {/* Description */}
        <textarea
          {...register('description', { required: "This field is required" })}
          placeholder="Description"
          className={`mb-2 ${errors.description ? "border-red-600" : "border-gray-300"} border p-2 rounded-md w-full`} />
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}

        {/* Phone */}
        <TextInput
          {...register('phone')}
          placeholder="Phone"
          type="tel"
          className="mb-2"
          color={errors.phone ? "failure" : "gray"} />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

        {/* Email */}
        <TextInput
          {...register('email', { required: "This field is required" })}
          placeholder="Email"
          type="email"
          className="mb-2"
          color={errors.email ? "failure" : "gray"} />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        {/* Submit Button */}
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Updating..." : "Update Card"}
        </Button>
      </form>
    </div>
  );
};

export default EditCard;
