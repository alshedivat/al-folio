require 'spec_helper'

describe(Jekyll::EmailProtect::EmailProtectionFilter) do
  let(:output) do
    render_liquid(content, {'email' => email})
  end

  context "simple example address" do
    let(:email) { "example@example.com" }
    let(:content)  { "{{ '#{email}' | encode_email }}" }

    it "produces the correct percent-encoded email" do
      expect(output).to eq("%65%78%61%6D%70%6C%65@%65%78%61%6D%70%6C%65.%63%6F%6D")
    end
  end

  context "example address with plus and dash" do
    let(:email) { "example-person+spam@example.com" }
    let(:content)  { "{{ '#{email}' | encode_email }}" }

    it "produces the correct percent-encoded email" do
      expect(output).to eq("%65%78%61%6D%70%6C%65-%70%65%72%73%6F%6E+%73%70%61%6D@%65%78%61%6D%70%6C%65.%63%6F%6D")
    end
  end
end
