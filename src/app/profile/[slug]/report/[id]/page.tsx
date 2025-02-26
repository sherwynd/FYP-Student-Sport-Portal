import UploadFileForm from "@/features/profile/components/UploadFileForm";

type ParamProps = {
  params: Promise<{ id: string; slug: string }>;
};

export default async function ProfileId({ params }: ParamProps) {
  const id = (await params).id;
  const slug = (await params).slug;
  return (
    <>
      <UploadFileForm id={id} slug={slug} />
    </>
  );
}
