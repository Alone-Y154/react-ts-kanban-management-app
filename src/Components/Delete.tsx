// type Props = {
//     type: string;
// }

const Delete = () => {
  // const type = props.type
  return (
    <div className="w-full flex justify-center items-center h-screen bg-secondary-700 absolute bg-opacity-50">
      <div className="flex flex-col w-[343px] h-[284px] p-6 bg-grey-400 rounded-md">
        <p className="text-danger-700 mb-6 text-lg font-bold">Delete this task?</p>
        <p className="text-[13px] mb-6 text-grey-700 font-medium leading-[23px]">
          Are you sure you want to delete the ‘Build settings UI’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <button className="rounded-[20px] bg-danger-700 text-grey-400 w-[295px] h-10 flex justify-center items-center text-[13px] font-bold leading-[23px] mb-4">Delete</button>
        <button className="rounded-[20px] bg-primary-700 bg-opacity-10 text-primary-700 w-[295px] h-10 flex justify-center items-center text-[13px] font-bold leading-[23px] ">cancel</button>
      </div>
    </div>
  );
};

export default Delete;