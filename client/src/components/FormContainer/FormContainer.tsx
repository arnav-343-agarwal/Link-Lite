import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";

interface IFormContainerProps {
    updateReloadState: ()=>void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
    const {updateReloadState} = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });
      setFullUrl("");
      updateReloadState();
      setError(""); // Clear error on successful submission
    } catch (error) {
      console.log(error);
      setError("Failed to shorten the URL. Please try again."); // Show error to the user
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
        <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
          <h2 className="text-white text-4xl text-center pb-4">Link Lite</h2>
          <p className="text-white text-center pb-2 text-xl">
            Simplify Your Links, Amplify Your Reach
          </p>
          <p className="text-white text-center pb-4 text-sm font-thin">
            Turn long, complicated URLs into short, sleek links that are easy to
            share and track. With Link Lite, your links become more powerful,
            driving engagement and insights.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-slate-800">
                  LinkLite.link /
                </div>
                <input
                  type="text"
                  placeholder="Add your Link"
                  required
                  className="block w-full p-4 pl-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Shorten URL
                </button>
              </div>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
