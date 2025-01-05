import { NextRequest, NextResponse } from 'next/server';

const LANGFLOW_BASE_URL = 'https://api.langflow.astra.datastax.com';
const FLOW_ID = '3f068f73-d972-4fe4-858e-4ec140d46644';
const LANGFLOW_ID = 'd82ad8fb-94fa-455c-b3d3-62f311febc51';
const APPLICATION_TOKEN = process.env.ASTRA_DB_APPLICATION_TOKEN

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const headers = {
    'Authorization': `Bearer ${APPLICATION_TOKEN}`,
    'Content-Type': 'application/json',
  };

    ;

  try {
    const response = await fetch(
      `${LANGFLOW_BASE_URL}/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}?stream=false`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          input_value: message,
          input_type: 'chat',
          output_type: 'chat',
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const output = data.outputs[0].outputs[0].outputs.message.message.text;
    return NextResponse.json({ message: output });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}




