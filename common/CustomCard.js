export default function CustomCard({
  title,
  total,
  icon,
  color,
  iconColor,
  desc,
}) {
  return (
    <div className={`${color} p-7 rounded-2xl text-zinc-300 h-full`}>
      <div className="flex gap-4 justify-between items-start h-full ">
        {/* <div className="rounded-xl bg-blue-600 p-4 ">
          <div className="text-4xl bg-red-600">{icon}</div>
        </div> */}
        <div className="space-y-2 flex flex-col items-between justify-between h-full">
          <div>
            <div className="text-base md:text-xl">{title}</div>
            <p className="text-zinc-300">{desc}</p>
          </div>
          <div className="text-2xl md:text-5xl font-bold">
            <div>{total}</div>
          </div>
        </div>
        <div>
          <div className={`rounded-full ${iconColor} p-4`}>
            <div className="text-sm md:text-4xl">{icon}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
