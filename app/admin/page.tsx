"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Header from "../header";

interface Registration {
  id: string;
  name: string;
  companyName: string;
  jobTitle: string;
  mobileNumber: string;
  officePhone?: string;
  email: string;
  website?: string;
  officeAddress: string;
  country: string;
  industry: string;
  sourceEvent: string;
  followUpDate?: string;
  followUp: boolean;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/registration");
      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }
      const data = await response.json();
      setRegistrations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Header />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading registrations...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <Header />
        <div className="container mx-auto p-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <Button onClick={fetchRegistrations} className="mt-4">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Registration Admin</h1>
            <p className="text-muted-foreground">
              Total registrations: {registrations.length}
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Form</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {registrations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No registrations found.</p>
              </CardContent>
            </Card>
          ) : (
            registrations.map((registration) => (
              <Card key={registration.id} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{registration.name}</CardTitle>
                      <CardDescription>
                        {registration.jobTitle} at {registration.companyName}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {registration.followUp && (
                        <Badge variant="secondary">Follow-up Requested</Badge>
                      )}
                      <Badge variant="outline">
                        {formatDate(registration.createdAt)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Contact</h4>
                      <p className="text-sm">{registration.email}</p>
                      <p className="text-sm">{registration.mobileNumber}</p>
                      {registration.officePhone && (
                        <p className="text-sm">Office: {registration.officePhone}</p>
                      )}
                      {registration.website && (
                        <p className="text-sm">
                          <a 
                            href={registration.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {registration.website}
                          </a>
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Company Info</h4>
                      <p className="text-sm">Industry: {registration.industry}</p>
                      <p className="text-sm">Country: {registration.country}</p>
                      <p className="text-sm">Source: {registration.sourceEvent}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground">Address</h4>
                      <p className="text-sm">{registration.officeAddress}</p>
                      {registration.followUpDate && (
                        <p className="text-sm mt-2">
                          <span className="font-medium">Follow-up Date:</span> {registration.followUpDate}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {registration.comment && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Comments</h4>
                      <p className="text-sm bg-muted p-3 rounded-md">{registration.comment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}