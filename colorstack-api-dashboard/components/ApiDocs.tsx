'use client'

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import { Book, Lock, Server, Shield } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ApiDocs: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const endpointSections = [
    {
      title: "Members",
      bgColor: "bg-teal-50",
      endpoints: [
        { method: "GET", path: "/members", description: "Retrieve all current student's information." },
        { method: "GET", path: "/members/:id", description: "Retrieve unique student information by ID." },
      ],
    },
    {
      title: "Slack Channels",
      bgColor: "bg-sage-50",
      endpoints: [
        { method: "GET", path: "/slack-channels", description: "Retrieve all Slack channels." },
        { method: "GET", path: "/slack-channels/:id", description: "Retrieve a specific Slack channel by ID." },
      ],
    },
    {
      title: "Slack Messages",
      bgColor: "bg-teal-50",
      endpoints: [
        { method: "GET", path: "/slack-messages", description: "Retrieve all messages from Slack." },
        { method: "GET", path: "/slack-messages/:student_id", description: "Retrieve a specific message by student ID." },
      ],
    },
    {
      title: "Slack Reactions",
      bgColor: "bg-sage-50",
      endpoints: [
        { method: "GET", path: "/slack-reactions", description: "Retrieve all reactions from Slack." },
        { method: "GET", path: "/slack-reactions/:student_id", description: "Retrieve a specific reaction by student ID." },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 to-sage-600">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Nav />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={handleSignOut}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">API Documentation</h1>
            
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Book className="text-teal-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Getting Started</h2>
              </div>
              <p className="text-gray-600">To use the ColorStack API, you will need to authenticate using your API key. You can find your API key in the Dashboard.</p>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="text-teal-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Authentication</h2>
              </div>
              <p className="text-gray-600">Include your API key in the Authorization header of all requests:</p>
              <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-x-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
              <p className="text-gray-600 mt-2">Your API key is linked to your unique ColorStack-ID. Do not share your API key or use duplicate keys, as this may result in account suspension.</p>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Server className="text-teal-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Endpoints</h2>
              </div>
              
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {endpointSections.map((section, index) => (
                    <CarouselItem key={index}>
                      <div className={`p-4 rounded-md ${section.bgColor}`}>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">{section.title}</h3>
                        {section.endpoints.map((endpoint, endpointIndex) => (
                          <div key={endpointIndex} className="mb-4">
                            <p className="text-gray-600 mb-2 font-semibold">{endpoint.method} {endpoint.path}</p>
                            <p className="text-gray-600">{endpoint.description}</p>
                          </div>
                        ))}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Shield className="text-teal-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Security Measures</h2>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                <li>API access is monitored using data analytics tools to detect potential abuse</li>
                <li>IP address limitations may be implemented to prevent abuse from multiple locations</li>
                <li>Violating the terms of use may result in API access suspension</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support</h2>
              <p className="text-gray-600">If you encounter any issues or have questions about the API, please contact our support team at <a href="mailto:api-support@colorstack.com" className="text-teal-600 hover:text-teal-700">api-support@colorstack.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

