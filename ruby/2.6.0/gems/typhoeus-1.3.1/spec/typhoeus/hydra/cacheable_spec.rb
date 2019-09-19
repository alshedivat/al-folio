require 'spec_helper'

describe Typhoeus::Hydra::Cacheable do
  let(:base_url) { "localhost:3001" }
  let(:hydra) { Typhoeus::Hydra.new() }
  let(:request) { Typhoeus::Request.new(base_url, {:method => :get}) }
  let(:cache) { MemoryCache.new }

  describe "add" do
    context "when cache activated" do
      before { Typhoeus::Config.cache = cache }
      after { Typhoeus::Config.cache = false }

      context "when request new" do
        it "sets no response" do
          hydra.add(request)
          expect(request.response).to be_nil
        end

        it "doesn't call complete" do
          expect(request).to receive(:complete).never
          hydra.add(request)
        end
      end

      context "when request in memory" do
        let(:response) { Typhoeus::Response.new }
        before { cache.memory[request] = response }

        it "returns response with cached status" do
          hydra.add(request)
          expect(response.cached?).to be_truthy
        end

        context "when no queued requests" do
          it "finishes request" do
            expect(request).to receive(:finish).with(response)
            hydra.add(request)
            expect(response.cached?).to be_truthy
          end
        end

        context "when queued requests" do
          let(:queued_request) { Typhoeus::Request.new(base_url, {:method => :get}) }

          before { cache.memory[queued_request] = response }

          it "finishes both requests" do
            hydra.queue(queued_request)
            expect(request).to receive(:finish).with(response)
            expect(queued_request).to receive(:finish).with(response)
            hydra.add(request)
          end
        end
      end
    end
  end
end
